/*!
 * vue-countdown v0.2.0
 * https://github.com/xkeshi/vue-countdown
 *
 * Copyright (c) 2017 xkeshi
 * Released under the MIT license
 *
 */
const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

const countdown = {
    install(Vue) {
        return Vue.component('countdown', countdown);
    },
    data() {
        return {
            /**
             * Total number of time (in milliseconds) for the countdown.
             * @type {number}
             */
            count: 0,

            /**
             * Define if the time is countdowning.
             * @type {boolean}
             */
            counting: false,
        };
    },

    props: {
        /**
         * Start to countdown automatically when initialized.
         */
        autoStart: {
            type: Boolean,
            default: true,
        },

        /**
         * Update interval time (in milliseconds) of the countdown.
         */
        interval: {
            type: Number,
            default: 1000,
        },

        /**
         * Total number of time (in milliseconds) for the countdown.
         */
        time: {
            type: Number,
            default: 0,
            required: true,
            validator: value => value >= 0,
        },

        /**
         * The tag of the component root element in the countdown.
         */
        tag: {
            type: String,
            default: 'span',
        },
    },

    computed: {
        /**
         * Remaining days.
         * @returns {number}
         */
        days() {
            return Math.floor(this.count / MILLISECONDS_DAY);
        },

        /**
         * Remaining hours.
         * @returns {number}
         */
        hours() {
            return Math.floor((this.count % MILLISECONDS_DAY) / MILLISECONDS_HOUR);
        },

        /**
         * Remaining minutes.
         * @returns {number}
         */
        minutes() {
            return Math.floor((this.count % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE);
        },

        /**
         * Remaining seconds.
         * @returns {number}
         */
        seconds() {
            const interval = this.interval;
            const seconds = (this.count % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND;

            if (interval < 10) {
                return seconds.toFixed(3);
            } else if (interval >= 10 && interval < 100) {
                return seconds.toFixed(2);
            } else if (interval >= 100 && interval < 1000) {
                return seconds.toFixed(1);
            }

            return Math.floor(seconds);
        },
    },

    render(createElement) {
        return createElement(this.tag, this.$scopedSlots.default ? [
            this.$scopedSlots.default({
                days: this.days,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
            }),
        ] : this.$slots.default);
    },

    created() {
        if (this.time > 0) {
            this.count = this.time;
        }
    },

    mounted() {
        if (this.autoStart) {
            this.start();
        }
    },

    beforeDestroy() {
        this.destroy();
    },

    methods: {
        /**
         * Start to countdown.
         * @public
         * @emits Countdown#countdownstart
         */
        start() {
            if (this.counting) {
                return;
            }

            /**
             * Countdown start event.
             * @event Countdown#countdownstart
             */
            this.$emit('countdownstart');
            this.counting = true;
            this.step();
        },

        /**
         * Step to countdown.
         * @private
         * @emits Countdown#countdownprogress
         */
        step() {
            if (!this.counting) {
                return;
            }

            /**
             * Countdown progress event.
             * @event Countdown#countdownprogress
             */
            this.$emit('countdownprogress', {
                days: this.days,
                hours: this.hours,
                minutes: this.minutes,
                seconds: this.seconds,
            });

            if (this.count > 0) {
                const interval = this.interval;

                this.timeout = setTimeout(() => {
                    this.count -= interval;
                    this.step();
                }, interval);
            } else {
                this.stop();
            }
        },

        /**
         * Stop the countdown.
         * @public
         * @emits Countdown#countdownend
         */
        stop() {
            this.destroy();

            /**
             * Countdown end event.
             * @event Countdown#countdownend
             */
            this.$emit('countdownend');
        },

        /**
         * Destroy the countdown.
         * @private
         */
        destroy() {
            this.counting = false;
            clearTimeout(this.timeout);
        },
    },
};

export default countdown;