export class RewardsModel {
  constructor() {
    this.rewards = [
      {
        id: 1,
        title: 'Free Coffee',
        description: 'Enjoy a free coffee at your favorite café.',
        points: 100,
        image: '/src/assets/images/reward-1.svg'
      },
      {
        id: 2,
        title: 'Discount Voucher',
        description: 'Get a 20% discount on your next purchase.',
        points: 200,
        image: '/src/assets/images/reward-1.svg'
      },
      {
        id: 3,
        title: 'Movie Ticket',
        description: 'Watch a movie of your choice for free.',
        points: 300,
        image: '/src/assets/images/reward-1.svg'
      },
      {
        id: 4,
        title: 'Movie Ticket',
        description: 'Watch a movie of your choice for free.',
        points: 300,
        image: '/src/assets/images/reward-1.svg'
      },
      {
        id: 5,
        title: 'Movie Ticket',
        description: 'Watch a movie of your choice for free.',
        points: 300,
        image: '/src/assets/images/reward-1.svg'
      },
      {
        id: 6,
        title: 'Movie Ticket',
        description: 'Watch a movie of your choice for free.',
        points: 300,
        image: '/src/assets/images/reward-1.svg'
      }
    ];
  }

  getRewards() {
    return Promise.resolve(this.rewards)
  }

  claimReward(id) {
    return Promise.resolve(`Reward with ID ${id} has been claimed.`)
  }
}
