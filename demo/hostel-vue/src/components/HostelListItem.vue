<template>
  <div class="card">
    <div class="content">
      <div class="right floated meta">
        <i v-bind:class="{ red: like }" class="heart icon" @click="$emit('like', hostel)"></i>
      </div>
      <div class="header">{{ hostel.name }}</div>
      </div>
      <div class="content">
        <div class="meta">
          {{ hostel.location }}
          <i v-if="hostel.bonus.hasFreeWifi" class="wifi icon"></i>
          <i v-if="hostel.bonus.hasFreeBreakfast" class="coffee icon"></i>
          <i v-if="hostel.bonus.hasTv" class="desktop icon"></i>
          <i v-if="hostel.bonus.hasBar" class="bar icon"></i>
          <div class="right floated meta">
              {{ hostel.price.amount }}{{ hostel.price.currency }}/night
            </div>
        </div>
        <div class="description">
            {{ hostel.description }}
        </div>
      </div>
      <div v-if="hostel.availability" class="ui orange bottom attached button">
        Book now
      </div>
      <div v-else class="ui bottom attached disabled button">
        Too late!
      </div>
  </div>
</template>

<script>
export default {
  props: ['hostel', 'like']
}
</script>
