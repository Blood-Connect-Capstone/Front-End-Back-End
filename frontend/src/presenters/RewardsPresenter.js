// presenters/useRewardsPresenter.js
import { reactive, toRefs } from 'vue'
import { getUserPoint, RewardsModel } from '../models/RewardsModel'


export function RewardsPresenter() {
  const model = new RewardsModel()

  const state = reactive({
    rewards: []
  })

  async function loadRewards() {
    state.rewards = await model.getRewards()
  }

  async function claimReward(id) {
    const result = await model.claimReward(id)
    alert(result)
  }

  async function getPoint() {
    const response = await getUserPoint();
    return response;
  }

  return {
    ...toRefs(state),
    loadRewards,
    claimReward,
    getPoint
  }
}
