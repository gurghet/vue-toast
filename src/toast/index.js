import './style.css'
import template from './template.html'

export default {
  template: template,
  props: {
    message: {
      required: true
    },
    position: {
      type: Number,
      required: true
    },
    destroyed: {
      type: Boolean,
      required: true
    },
    options: {
      type: Object,
      default () {
        return {
          theme: 'default',
          timeLife: 5000,
          closeBtn: false,
        }
      }
    },
  },
  data() {
    return {
      isShow: false
    }
  },
  computed: {
    theme() {
      return '_' + this.options.theme
    },
    style() {
      return `transform: translateY(${this.options.directionOfJumping}${this.position * 100}%)`
    }
  },
  mounted() {
    setTimeout(() => {
      this.isShow = true
    }, 50)

    if (!this.options.closeBtn) {
      this._startLazyAutoDestroy()
    }
  },
  destroyed() {
    clearTimeout(this.timerDestroy)
  },
  methods: {
    // Public
    remove() {
      this._clearTimer()
      this.$parent.$emit('destroyed', this.position)
      this.$el.remove()

      return this
    },
    // Private
    _startLazyAutoDestroy() {
      this._clearTimer()
      this.timerDestroy = setTimeout(() => {
        this.$el.remove()
      }, this.options.timeLife)
    },
    _clearTimer() {
      if (this.timerDestroy) {
        clearTimeout(this.timerDestroy)
      }
    },
    _startTimer() {
      if (!this.options.closeBtn) {
        this._startLazyAutoDestroy()
      }
    },
    _stopTimer() {
      if (!this.options.closeBtn) {
        this._clearTimer()
      }
    }
  }
}
