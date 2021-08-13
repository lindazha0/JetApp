export default {
    name: "slider",
    props: {
        initialSpeed: {
            type: Number,
            default: 30
        },
        initialInterval: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            value:'',
            dirName:"labixiaoxin",
            nameList:{
                "huihui": "慧慧", 
                "labixiaoxin": "严佳", 
                "img": "百度美女"
            },
            sliders: [
                require("../assets/labixiaoxin/1.jpg"),
                ],
            imgWidth: 600,
            currentIndex: 1,
            distance: -600,
            transitionEnd: true,
            speed: this.initialSpeed
        }
    },
    watched:{
        
    },
    computed: {
        containerStyle() {
            return {
                transform: `translate3d(${this.distance}px, 0, 0)`
            }
        },
        interval() {
            return this.initialInterval * 1000
        }
    },
    mounted() {
            this.initSlider(this.dirName+"/")
            this.init()
    },
    methods: {
        refresh(dirName){
            this.initSlider(dirName+"/")
            this.init()
        },
        init() {
            this.play()
            window.onblur = function () { this.stop() }.bind(this)
            window.onfocus = function () { this.play() }.bind(this)
        },
        initSlider(dirName) {
            // dir = "../assets/huihui/";
            // console.log(dir)
            if(dirName == "huihui/")
                var requireModule = require.context("../assets/huihui/", false, /\.jpg$/);
            else if(dirName == "labixiaoxin/")
                var requireModule = require.context("../assets/labixiaoxin/", false, /\.jpg$/);
            else if(dirName == "img/")
                var requireModule = require.context("../assets/img/", false, /\.jpg$/);
            else
                alert("invalid input")
            this.sliders = [];
            for (var i = 0; i < requireModule.keys().length; i++) {
                this.sliders.push(
                    require("@/assets/" + `${dirName}` + requireModule.keys()[i].substr(2, requireModule.keys()[i].length))
                );
            }
            // console.log(this.sliders)
        },
        move(offset, direction, speed) {
            //   console.log(speed)
            if (!this.transitionEnd) return
            this.transitionEnd = false
            direction === -1 ? this.currentIndex += offset / 600 : this.currentIndex -= offset / 600
            if (this.currentIndex > 5) this.currentIndex = 1
            if (this.currentIndex < 1) this.currentIndex = 5

            const destination = this.distance + offset * direction
            this.animate(destination, direction, speed)
        },
        animate(des, direc, speed) {
            if (this.temp) {
                window.clearInterval(this.temp);
                this.temp = null;
            }
            this.temp = window.setInterval(() => {
                if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
                    this.distance += speed * direc
                } else {
                    this.transitionEnd = true
                    window.clearInterval(this.temp)
                    this.distance = des
                    if (des < -3000) this.distance = -600
                    if (des > -600) this.distance = -3000
                }
            }, 20)
        },
        jump(index) {
            const direction = index - this.currentIndex >= 0 ? -1 : 1;
            const offset = Math.abs(index - this.currentIndex) * 600;
            const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed;
            this.move(offset, direction, jumpSpeed)
        },
        play() {
            if (this.timer) {
                window.clearInterval(this.timer)
                this.timer = null
            }
            this.timer = window.setInterval(() => {
                this.move(600, -1, this.speed)
            }, this.interval)
        },
        stop() {
            window.clearInterval(this.timer)
            this.timer = null
        }
    }
}
