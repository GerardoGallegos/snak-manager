import Hamster from 'hamsterjs'

/* Minimap */

export default function(WaveSurfer) {

WaveSurfer.Minimap = WaveSurfer.util.extend({}, WaveSurfer.Drawer, WaveSurfer.Drawer.Canvas, {
    init: function (wavesurfer, params) {
        //this.zoom = 38; /*********************************************/
        this.wavesurfer = wavesurfer;
        this.container = this.wavesurfer.drawer.container;
        this.lastPos = this.wavesurfer.drawer.lastPos;
        this.params = wavesurfer.util.extend(
            {}, this.wavesurfer.drawer.params, {
                showRegions: false,
                showOverview: false,
                overviewBorderColor: 'green',
                overviewBorderSize: 2
            }, params, {
                scrollParent: false,
                fillParent: true
            }
        );

        this.width = 0;
        this.height = this.params.height * this.params.pixelRatio;

        this.createWrapper();
        this.createElements();

        if (WaveSurfer.Regions && this.params.showRegions) {
            this.regions();
        }

        this.bindWaveSurferEvents();
        this.bindMinimapEvents();
    },
    regions: function() {
        var my = this;
        this.regions = {};

        this.wavesurfer.on('region-created', function(region) {
            my.regions[region.id] = region;
            my.renderRegions();
        });

        this.wavesurfer.on('region-updated', function(region) {
            my.regions[region.id] = region;
            my.renderRegions();
        });

        this.wavesurfer.on('region-removed', function(region) {
            delete my.regions[region.id];
            my.renderRegions();
        });
    },
    renderRegions: function() {
        var my = this;
        var regionElements = this.wrapper.querySelectorAll('region');
        for (var i = 0; i < regionElements.length; ++i) {
          this.wrapper.removeChild(regionElements[i]);
        }

        Object.keys(this.regions).forEach(function(id){
            var region = my.regions[id];
            var width = (my.width * ((region.end - region.start) / my.wavesurfer.getDuration()));
            var left = (my.width * (region.start / my.wavesurfer.getDuration()));
            var regionElement = my.style(document.createElement('region'), {
                height: 'inherit',
                backgroundColor: region.color,
                width: width + 'px',
                left: left + 'px',
                display: 'block',
                position: 'absolute'
            });
            regionElement.classList.add(id);
            my.wrapper.appendChild(regionElement);
        });
    },
    createElements: function() {
        WaveSurfer.Drawer.Canvas.createElements.call(this);

        if (this.params.showOverview) {
            this.overviewRegion =  this.style(document.createElement('overview'), {
                height: (this.wrapper.offsetHeight - (this.params.overviewBorderSize * 2)) + 'px',
                width: '0px',
                display: 'block',
                position: 'absolute',
                cursor: 'move',
                border: this.params.overviewBorderSize + 'px solid ' + this.params.overviewBorderColor,
                zIndex: 2,
                backgroundColor : this.params.backgroundColor,
                opacity: this.params.overviewOpacity
            });

            this.wrapper.appendChild(this.overviewRegion);
        }
    },

    bindWaveSurferEvents: function () {
        var my = this;
        this.wavesurfer.on('ready', this.render.bind(this));
        this.wavesurfer.on('audioprocess', function (currentTime) {
            my.progress(my.wavesurfer.backend.getPlayedPercents());
        });
        this.wavesurfer.on('seek', function(progress) {
            my.progress(my.wavesurfer.backend.getPlayedPercents());
        });

        if (this.params.showOverview) {
            this.wavesurfer.on('scroll', function(event) {
                if (!my.draggingOverview) {
                    my.moveOverviewRegion(event.target.scrollLeft / my.ratio);
                }
            });

            this.wavesurfer.drawer.wrapper.addEventListener('mouseover', function(event) {
                if (my.draggingOverview)  {
                    my.draggingOverview = false;
                }
            });
        }

        var prevWidth = 0;
        var onResize = function () {
          //console.log(prevWidth, my.wrapper.clientWidth)
          //console.log(my.wavesurfer.backend.getPlayedPercents())
            if (prevWidth != my.wrapper.clientWidth) {
                prevWidth = my.wrapper.clientWidth;
                my.render();
                my.progress(my.wavesurfer.backend.getPlayedPercents());
            }

            // Cambia el sroll
            /**************************************************************/
            my.render();
            my.progress(my.wavesurfer.backend.getPlayedPercents());

            /****************************************************************/


        };
        window.addEventListener('resize', onResize, true);

        /************************************************/


        Hamster(this.wrapper.parentNode).wheel(onResize)


        /*********************************************/

        this.wavesurfer.on('destroy', function () {
            my.destroy.bind(this);
            window.removeEventListener('resize', onResize, true);
        });
    },

    bindMinimapEvents: function () {
        var my = this;
        var relativePositionX = 0;
        var seek = true;
        var positionMouseDown = {
            clientX: 0,
            clientY: 0
        };

        this.on('click', (function (e, position) {
            if (seek)  {
                this.progress(position);
                this.wavesurfer.seekAndCenter(position);
            } else {
                seek = true;
            }
        }).bind(this));

        if (this.params.showOverview) {
            this.overviewRegion.addEventListener('mousedown', function(event) {
                my.draggingOverview = true;
                relativePositionX = event.layerX;
                positionMouseDown.clientX = event.clientX;
                positionMouseDown.clientY = event.clientY;
            });

            this.wrapper.addEventListener('mousemove', function(event) {
                if(my.draggingOverview) {
                    my.moveOverviewRegion(event.clientX - my.container.getBoundingClientRect().left - relativePositionX);
                }
            });
/**********************************************************************************/
            // this.wrapper.parentNode.addEventListener('mousedown', function(event) {
            //     alert('oooo')
            // });






            // Hamster(this.wrapper.parentNode).wheel((event, delta, deltaX, deltaY)=>{
            //     console.log(this.zoom, deltaY)
            //     console.log(WaveSurfer)
            //     if(this.zoom > 37 && this.zoom < 101) {
            //       this.zoom += deltaY
            //       WaveSurfer.zoom(this.zoom);
            //     }
            //     else if(this.zoom <= 37) {
            //       console.log('menor que 38')
            //       this.zoom = 38
            //     }
            //     else if(this.zoom >= 100) {
            //       console.log('mayor que 100')
            //       this.zoom = 99
            //     }
            // })
/**********************************************************************************/
            this.wrapper.addEventListener('mouseup', function(event) {
                if (positionMouseDown.clientX - event.clientX === 0 && positionMouseDown.clientX - event.clientX === 0) {
                    seek = true;
                    my.draggingOverview = false;
                } else if (my.draggingOverview)  {
                    seek = false;
                    my.draggingOverview = false;
                }
            });
        }
    },

    render: function () {
        var len = this.getWidth();
        var peaks = this.wavesurfer.backend.getPeaks(len);
        this.drawPeaks(peaks, len);
        //this.wrapper.addEventListener('onclick', function(){alert()})
        //console.log(this.wrapper)


        if (this.params.showOverview) {
            //get proportional width of overview region considering the respective
            //width of the drawers
            //debugger
            //console.log(this)
            this.ratio = this.wavesurfer.drawer.width / this.width;
            this.waveShowedWidth = this.wavesurfer.drawer.width / this.ratio;
            this.waveWidth = this.wavesurfer.drawer.width;
            this.overviewWidth = (this.width / this.ratio);
            this.overviewPosition = 0;
            this.overviewRegion.style.width = (this.overviewWidth - (this.params.overviewBorderSize * 2)) + 'px';  // (this.overviewWidth - (this.params.overviewBorderSize * 2)) + 'px';
            //console.log(this.width)
            //console.log((this.overviewWidth - (this.params.overviewBorderSize * 2)) + 'px')
        }
    },
    moveOverviewRegion: function(pixels) {
        if (pixels < 0) {
            this.overviewPosition = 0;
        } else if (pixels + this.overviewWidth < window.innerWidth) {
            this.overviewPosition = pixels;
        } else {
            this.overviewPosition = (window.innerWidth - this.overviewWidth);
        }
        this.overviewRegion.style.left = this.overviewPosition + 'px';
        this.wavesurfer.drawer.wrapper.scrollLeft = this.overviewPosition * this.ratio;
    }
});


WaveSurfer.initMinimap = function (params) {
    var map = Object.create(WaveSurfer.Minimap);
    map.init(this, params);
    return map;
};

}
