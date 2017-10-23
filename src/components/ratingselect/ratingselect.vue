<template>
  <div class="rating-select">
    <div class="rating-type border-1px">
      <span @click="select(2)" :class="{'active': selectType === 2}" class="block positive">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" :class="{'active': selectType === 0}" class="block positive">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1)" :class="{'active': selectType === 1}" class="block negative">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggle" :class="{'on': onlyContent}" class="switch">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0  // 评价-推荐
  const NEGATIVE = 1  // 评价-吐槽
  const ALL = 2       // 评价-全部

  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      syncSelectType: {
        type: Number,
        default: ALL
      },
      syncOnlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data () {
      return {
        selectType: this.syncSelectType,
        onlyContent: this.syncOnlyContent
      }
    },
    watch: {
      syncSelectType (newValue) {
        this.selectType = newValue
      },
      syncOnlyContent (newValue) {
        this.onlyContent = newValue
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    methods: {
      select (type) {
        this.selectType = type
        this.$emit('update:syncSelectType', this.selectType)
      },
      toggle () {
        this.onlyContent = !this.onlyContent
        this.$emit('update:syncOnlyContent', this.onlyContent)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'

  .rating-select
    .rating-type
      padding: 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, .1))
      font-size 0
      .block
        display: inline-block
        padding 8px 12px
        margin-right 8px
        line-height: 16px
        border-radius 1px
        color: rgb(77, 85, 93)
        font-size 12px
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size 8px
        &.positive
          background: rgba(0, 160, 220, .2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, .2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding 12px 18px
      line-height 24px
      color rgb(147, 153, 159)
      font-size 0
      border-bottom 1px solid rgba(7, 17, 27, .1)
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display: inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
      .text
        display: inline-block
        vertical-align top
        font-size 12px
</style>
