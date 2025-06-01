// presenters/useRewardsPresenter.js
import { reactive, toRefs } from 'vue'
import { RewardsModel } from '../models/RewardsModel'

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

  return {
    ...toRefs(state),
    loadRewards,
    claimReward
  }
}
