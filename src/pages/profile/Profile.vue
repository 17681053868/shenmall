<template>
  <div id="profile">
    <navigation-bar class="nav-bar">
      <div slot="center">凌云阁商城</div>
    </navigation-bar>
    <user-info></user-info>
    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠券</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <list-view class="order-list"></list-view>
  </div>
</template>

<script>
import UserInfo from '@/pages/profile/childComps/UserInfo'
import ListView from '@/pages/profile/childComps/ListView'

import NavigationBar from '@/components/common/navigationbar/NavigationBar'
export default {
  name: 'Profile',
  components: {
    UserInfo,
    ListView,
    NavigationBar,
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
  letter-spacing: 5px;
}
.account {
  display: flex;
}
.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}
.account-item:last-of-type {
  margin-right: 0;
}
.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}
.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}
.account-info {
  margin-top: 6px;
}
.order-list, .service-list {
  margin-top: 12px;
}
</style>