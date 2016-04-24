'use strict';

import STORE from '../store/snak-store'
import { dragRegion, clickRegion } from '../actions/snak-actions'

import styles from './Regions.scss'


export default function(WaveSurfer){
/* Regions manager */
WaveSurfer.Regions = {
    init: function (wavesurfer) {
        this.wavesurfer = wavesurfer;
        this.wrapper = this.wavesurfer.drawer.wrapper;

        /* Id-based hash of regions. */
        this.list = {};
    },

    /* Add a region. */
    add: function (params) {
        var region = Object.create(WaveSurfer.Region);
        region.init(params, this.wavesurfer);

        this.list[region.id] = region;

        region.on('remove', (function () {
            delete this.list[region.id];
        }).bind(this));

        return region;
    },

    /* Remove all regions. */
    clear: function () {
        Object.keys(this.list).forEach(function (id) {
            this.list[id].remove();
        }, this);
    },

    enableDragSelection: function (params) {
        var my = this;
        var drag;
        var start;
        var region;

        function eventDown(e) {

            drag = true;
            if (typeof e.targetTouches !== 'undefined' && e.targetTouches.length === 1) {
                e.clientX = e.targetTouches[0].clientX;
            }
            start = my.wavesurfer.drawer.handleEvent(e);
            region = null;
        }
        this.wrapper.addEventListener('mousedown', eventDown);
        this.wrapper.addEventListener('touchstart', eventDown);
        this.on('disable-drag-selection', function() {
            my.wrapper.removeEventListener('touchstart', eventDown);
            my.wrapper.removeEventListener('mousedown', eventDown);
        });
        function eventUp(e) {
            drag = false;

            if (region) {
                region.fireEvent('update-end', e);
                my.wavesurfer.fireEvent('region-update-end', region, e);
            }

            region = null;
        }
        this.wrapper.addEventListener('mouseup', eventUp);
        this.wrapper.addEventListener('touchend', eventUp);
        this.on('disable-drag-selection', function() {
            my.wrapper.removeEventListener('touchend', eventUp);
            my.wrapper.removeEventListener('mouseup', eventUp);
        });
        function eventMove(e) {

            if (!drag) { return; }

            if (!region) {
                region = my.add(params || {});
            }

            var duration = my.wavesurfer.getDuration();
            if (typeof e.targetTouches !== 'undefined' && e.targetTouches.length === 1) {
                e.clientX = e.targetTouches[0].clientX;
            }
            var end = my.wavesurfer.drawer.handleEvent(e);

            region.update({
                start: Math.min(end * duration, start * duration),
                end: Math.max(end * duration, start * duration)
            });
        }
        this.wrapper.addEventListener('mousemove', eventMove);
        this.wrapper.addEventListener('touchmove', eventMove);
        this.on('disable-drag-selection', function() {
            my.wrapper.removeEventListener('touchmove', eventMove);
            my.wrapper.removeEventListener('mousemove', eventMove);
        });
    },

    disableDragSelection: function () {
        this.fireEvent('disable-drag-selection');
    }
};

WaveSurfer.util.extend(WaveSurfer.Regions, WaveSurfer.Observer);

WaveSurfer.Region = {
    /* Helper function to assign CSS styles. */
    style: WaveSurfer.Drawer.style,

    init: function (params, wavesurfer) {
        this.wavesurfer = wavesurfer;
        this.wrapper = wavesurfer.drawer.wrapper;

        this.regionId = params.regionId == null ? WaveSurfer.util.getId() : params.regionId;
        /*===========================================================================================*/
        this.type = params.type == null ? '' : params.type;
        this.class = params.class == null ? 'region' : params.class;
        // this.onDragFunc = params.onDragFunc == null ? function(){} : params.onDragFunc;
        // this.onClickFunc = params.onClickFunc == null ? function(){} : params.onClickFunc;
          /*===========================================================================================*/

        this.start = Number(params.start) || 0;
        this.end = params.end == null ?
            // small marker-like region
            this.start + (4 / this.wrapper.scrollWidth) * this.wavesurfer.getDuration() :
            Number(params.end);
        this.resize = params.resize === undefined ? true : Boolean(params.resize);
        this.drag = params.drag === undefined ? true : Boolean(params.drag);
        this.loop = Boolean(params.loop);
        this.color = params.color || 'rgba(0, 0, 0, 0.1)';
        this.data = params.data || {};
        this.attributes = params.attributes || {};

        this.maxLength = params.maxLength;
        this.minLength = params.minLength;

        this.bindInOut();
        this.render();
        this.wavesurfer.on('zoom', this.updateRender.bind(this));
        this.wavesurfer.fireEvent('region-created', this);



    },

    /* Update region params. */
    update: function (params) {
        if (null != params.start) {
            this.start = Number(params.start);
        }
        if (null != params.end) {
            this.end = Number(params.end);
        }
        if (null != params.loop) {
            this.loop = Boolean(params.loop);
        }
        if (null != params.color) {
            this.color = params.color;
        }
        if (null != params.data) {
            this.data = params.data;
        }
        if (null != params.resize) {
            this.resize = Boolean(params.resize);
        }
        if (null != params.drag) {
            this.drag = Boolean(params.drag);
        }
        if (null != params.maxLength) {
            this.maxLength = Number(params.maxLength);
        }
        if (null != params.minLength) {
            this.minLength = Number(params.minLength);
        }
        if (null != params.attributes) {
            this.attributes = params.attributes;
        }

        this.updateRender();
        this.fireEvent('update');
        this.wavesurfer.fireEvent('region-updated', this);
    },

    /* Remove a single region. */
    remove: function (region) {
        if (this.element) {
            this.wrapper.removeChild(this.element);
            this.element = null;
            this.fireEvent('remove');
            this.wavesurfer.un('zoom', this.updateRender.bind(this));
            this.wavesurfer.fireEvent('region-removed', this);
        }
    },

    /* Play the audio region. */
    play: function () {
        this.wavesurfer.play(this.start, this.end);
        this.fireEvent('play');
        this.wavesurfer.fireEvent('region-play', this);
    },

    /* Play the region in loop. */
    playLoop: function () {
        this.play();
        this.once('out', this.playLoop.bind(this));
    },

    /* Render a region as a DOM element. */
    render: function () {

        var regionEl = document.createElement('region');
        regionEl.className = 'wavesurfer-region';
        regionEl.title = this.formatTime(this.start, this.end);
        regionEl.setAttribute('regionId', this.regionId);


        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        // var _textType = el.children[0]
        // var _textRange = el.children[1]
        // var _textTime = el.children[2]
        // var _bgRegion = el.children[3]


        var _star = (this.start).toString().substring(0,5)
        var _end = (this.end).toString().substring(0,5)
        var textRange = `[ ${_star} -  ${_end}  ]`
        var time = Math.round(this.end - this.start)

        regionEl.setAttribute('type', this.type);
        regionEl.setAttribute('class', `${this.class} ${this.class}-${this.type}` );
        regionEl.innerHTML = `
        <span class="region__text">${this.type}</span>
        <span class="region__textRange">${textRange}</span>
        <span class="region__time">${time}</span>
        <div class="region__bg-${this.type}"></div>`



        //console.log(regionEl.children[3])

        STORE.subscribe(()=>{
          let regionInFocus = STORE.getState().snak.regionInFocus

          // Validamos si se actuaizara este elemento
          if(regionInFocus.regionId === this.regionId) {

            regionEl.children[3].style.opacity = '.9'
            regionEl.style.opacity = '.9'

            //regionEl.children[0].innerText = regionInFocus[regionInFocus.type].title

            // Validamos si es tipo code
            if( regionInFocus.type === 'code') {
              // Valida si se requiere actualizar
              if(regionEl.children[3].getAttribute('class').search(regionInFocus.code.fileType) === -1) {
                regionEl.children[3].setAttribute('class', `region__bg-code region__bg-code-${regionInFocus.code.fileType}`)

              }
            }

          }
          else {
            regionEl.children[3].style.opacity = '.8'
            regionEl.style.opacity = '0.4'
            //regionEl.children[3].style.backgroundColor = '#000000'

          }
        })
        //console.log(regionEl.getAttribute('class'), regionInFocus.type)
        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        for (var attrname in this.attributes) {
            regionEl.setAttribute('data-region-' + attrname, this.attributes[attrname]);
        }

        var width = this.wrapper.scrollWidth;
        this.style(regionEl, {
            position: 'absolute',
            zIndex: 2,
            height: '100%',
            top: '0px'
        });

        /* Resize handles */
        if (this.resize) {
            var handleLeft = regionEl.appendChild(document.createElement('handle'));
            var handleRight = regionEl.appendChild(document.createElement('handle'));
            handleLeft.className = 'wavesurfer-handle wavesurfer-handle-start';
            handleRight.className = 'wavesurfer-handle wavesurfer-handle-end';
            var css = {
                cursor: 'col-resize',
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '1%',
                maxWidth: '4px',
                height: '100%'
            };
            this.style(handleLeft, css);
            this.style(handleRight, css);
            this.style(handleRight, {
                left: '100%'
            });
        }

        this.element = this.wrapper.appendChild(regionEl);
        this.updateRender();
        this.bindEvents(regionEl);
        //console.log(regionEl)
        this.responsiveRender(regionEl)/*     RESPONSIVE ELEMENT   **/
    },

    formatTime: function (start, end) {
        return (start == end ? [ start ] : [ start, end ]).map(function (time) {
            return [
                Math.floor((time % 3600) / 60), // minutes
                ('00' + Math.floor(time % 60)).slice(-2) // seconds
            ].join(':');
        }).join('-');
    },

    /* Update element's position, width, color. */
    updateRender: function (pxPerSec) {

        //  Element Responsive
        /*******************************************************************/

        this.responsiveRender(this.element)

        ////////////////////////////////////////////////////////////////////
        var dur = this.wavesurfer.getDuration();
        var width;
        if (pxPerSec) {
            width = Math.round(this.wavesurfer.getDuration() * pxPerSec);
        }
        else {
            width = this.wrapper.scrollWidth;
        }


/*        if (this.start < 0) {
          this.start = 0;
          this.end = this.end - this.start;
        }
        if (this.end > dur) {
          this.end = dur;
          this.start = dur - (this.end - this.start);
        }*/

        if (this.minLength != null) {
            this.end = Math.max(this.start + this.minLength, this.end);
        }

        if (this.maxLength != null) {
            this.end = Math.min(this.start + this.maxLength, this.end);
        }

        if (this.element != null) {
            this.style(this.element, {
                left: ~~(this.start / dur * width) + 'px',
                width: ~~((this.end - this.start) / dur * width) + 'px',
                //backgroundColor: this.color,*******************************************************
                cursor: this.drag ? 'move' : 'default'
            });

            for (var attrname in this.attributes) {
                this.element.setAttribute('data-region-' + attrname, this.attributes[attrname]);
            }

            this.element.title = this.formatTime(this.start, this.end);
        }
    },


    responsiveRender : function (el) {
       //console.log(el)
       //debugger
        var _width = parseInt((el.style.width).replace(/px/g, ''))
        var _textType = el.children[0]
        var _textRange = el.children[1]
        var _textTime = el.children[2]
        var _bgRegion = el.children[3]

        // Small
        if( _width < 85 ) {
          //console.log('SMALL')
          _textType.style.display = 'none'
          _textRange.style.display = 'none'
          _bgRegion.style.backgroundSize = '60%'
          _bgRegion.style.boxShadow= 'rgba(155, 227, 255, 1) 2px -4px 97px'
        }

        // medium
        else if( _width >= 85 && _width <= 200  )  {
          //console.log('MEDIUM')
          _textType.style.display = 'block'
          _textRange.style.display = 'block'
          _bgRegion.style.backgroundSize = '40px'
          _textRange.style.fontSize = '12px'
          _bgRegion.style.boxShadow= 'rgba(155, 227, 255, 1) 2px -4px 97px'
        }

        //big
        else if( _width > 201 )  {
          //console.log('BIG')
          _textRange.style.fontSize = '20px'
          _bgRegion.style.backgroundSize = '45px'
          _bgRegion.style.boxShadow= 'rgba(155, 227, 255, 1) 2px -4px 97px'
        }
    },






    /* Bind audio events. */
    bindInOut: function () {
        var my = this;

        my.firedIn = false;
        my.firedOut = false;

        var onProcess = function (time) {
            if (!my.firedIn && my.start <= time && my.end > time) {
                my.firedIn = true;
                my.firedOut = false;
                my.fireEvent('in');
                my.wavesurfer.fireEvent('region-in', my);
            }
            if (!my.firedOut && my.firedIn && (my.start >= Math.round(time * 100) / 100 || my.end <= Math.round(time * 100) / 100)) {
                my.firedOut = true;
                my.firedIn = false;
                my.fireEvent('out');
                my.wavesurfer.fireEvent('region-out', my);
            }
        };

        this.wavesurfer.backend.on('audioprocess', onProcess);

        this.on('remove', function () {
            my.wavesurfer.backend.un('audioprocess', onProcess);
        });

        /* Loop playback. */
        this.on('out', function () {
            if (my.loop) {
                my.wavesurfer.play(my.start);
            }
        });
    },

    /* Bind DOM events. */
    bindEvents: function () {
        var my = this;
        var _myElement = null;

        this.element.addEventListener('mouseenter', function (e) {
            _myElement = this;
            my.fireEvent('mouseenter', e);
            my.wavesurfer.fireEvent('region-mouseenter', my, e);
        });

        this.element.addEventListener('mouseleave', function (e) {
            my.fireEvent('mouseleave', e);
            my.wavesurfer.fireEvent('region-mouseleave', my, e);
        });

        this.element.addEventListener('click', function (e) {
            e.preventDefault();
            my.fireEvent('click', e);
            my.wavesurfer.fireEvent('region-click', my, e);

            /****************************************************************/


            /*****************************************************************/

        });
        /*****************************************************************/
        this.element.addEventListener('mousedown', function (e) {
            e.preventDefault();
            e.stopPropagation();

            //Click Region
            STORE.dispatch(clickRegion(
              {
                from : my.start,
                to : my.end,
                regionId : my.regionId,
                type : my.type
              }
            ))
        })

        /*****************************************************************/
        this.element.addEventListener('dblclick', function (e) {
            e.stopPropagation();
            e.preventDefault();
            my.fireEvent('dblclick', e);
            my.wavesurfer.fireEvent('region-dblclick', my, e);
        });

        /* Drag or resize on mousemove. */
        (this.drag || this.resize) && (function () {
            var duration = my.wavesurfer.getDuration();
            var drag;
            var resize;
            var startTime;

            var onDown = function (e) {
                e.stopPropagation();
                //console.log(e.target.classList)       DURATION
                startTime = my.wavesurfer.drawer.handleEvent(e) * duration;

                if (e.target.tagName.toLowerCase() == 'handle') {
                    if (e.target.classList.contains('wavesurfer-handle-start')) {
                        resize = 'start';
                    } else {
                        resize = 'end';
                    }
                } else {
                    drag = true;
                }
            };
            var onUp = function (e) {
                if (drag || resize) {
                    drag = false;
                    resize = false;
                    e.stopPropagation();
                    e.preventDefault();

                    my.fireEvent('update-end', e);
                    my.wavesurfer.fireEvent('region-update-end', my, e);
                }
            };
            var onMove = function (e) {
                if (drag || resize) {

                  /***************************************************/
                  var _start = (my.start).toString().substring(0,5)
                  var _end = (my.end).toString().substring(0,5)
                  var time = Math.round(my.end - my.start)
                  _myElement.children[1].innerHTML = '[ ' + _start + ' - ' + _end + ' ]'


                  _myElement.children[2].innerHTML = '<span class="region__time">'+time+'</span>'


                  STORE.dispatch(dragRegion(
                    {
                      from : my.start,
                      to : my.end,
                      regionId : my.regionId,
                      type : my.type
                    }
                  ))

                  /////////////////////////////////////////////////////

                    var time = my.wavesurfer.drawer.handleEvent(e) * duration;
                    var delta = time - startTime;
                    startTime = time;

                    // Drag
                    if (my.drag && drag) {
                        my.onDrag(delta);
                    }

                    // Resize
                    if (my.resize && resize) {
                        my.onResize(delta, resize);
                    }
                }
            };

            my.element.addEventListener('mousedown', onDown);
            my.wrapper.addEventListener('mousemove', onMove);
            document.body.addEventListener('mouseup', onUp);

            my.on('remove', function () {
                document.body.removeEventListener('mouseup', onUp);
                my.wrapper.removeEventListener('mousemove', onMove);
            });

            my.wavesurfer.on('destroy', function () {
                document.body.removeEventListener('mouseup', onUp);
            });
        }());
    },

    onDrag: function (delta) {

        this.update({
            start: this.start + delta,
            end: this.end + delta
        });
    },

    onResize: function (delta, direction) {
        if (direction == 'start') {
            this.update({
                start: Math.min(this.start + delta, this.end),
                end: Math.max(this.start + delta, this.end)
            });
        } else {
            this.update({
                start: Math.min(this.end + delta, this.start),
                end: Math.max(this.end + delta, this.start)
            });
        }
    }
};

WaveSurfer.util.extend(WaveSurfer.Region, WaveSurfer.Observer);


/* Augment WaveSurfer with region methods. */
WaveSurfer.initRegions = function () {
    if (!this.regions) {
        this.regions = Object.create(WaveSurfer.Regions);
        this.regions.init(this);
    }
};

WaveSurfer.addRegion = function (options) {
    this.initRegions();
    return this.regions.add(options);
};

WaveSurfer.clearRegions = function () {
    this.regions && this.regions.clear();
};

WaveSurfer.enableDragSelection = function (options) {
    this.initRegions();
    this.regions.enableDragSelection(options);
};

WaveSurfer.disableDragSelection = function () {
    this.regions.disableDragSelection();
};

}
