import { getCurrentUserWithProfile } from "@/composables/supabaseClient";
import axios from "axios";

export class RewardsModel {
  constructor() {
    this.rewards = [
      {
        id: 1,
        title: 'Galaxy S24 Ultra',
        description: 'Enjoy the latest smartphone with top-tier performance and advanced camera features.',
        points: 50000,
        image: '/assets/images/reward-1.svg'
      },
      {
        id: 2,
        title: 'Wireless Earbuds',
        description: 'Experience high-quality sound with wireless freedom.',
        points: 15000,
        image: '/assets/images/reward-2.jpg'
      },
      {
        id: 3,
        title: 'Stainless Steel Tumbler 580ml',
        description: 'A stylish and eco-friendly tumbler perfect for staying hydrated on the go.',
        points: 700,
        image: '/assets/images/reward-3.jpg'
      },
      {
        id: 4,
        title: 'Smartwatch Fitness Tracker',
        description: 'Track your daily activity and health metrics with this multifunctional smartwatch.',
        points: 20000,
        image: '/assets/images/reward-4.jpg'
      },
      {
        id: 5,
        title: 'Portable Power Bank',
        description: 'Charge your devices anywhere with this high-capacity power bank.',
        points: 3000,
        image: '/assets/images/reward-5.jpg'
      },
      {
        id: 6,
        title: 'Portable Handheld Fan',
        description: 'Stay cool with a USB-powered portable hand fan.',
        points: 500,
        image: '/assets/images/reward-6.jpg'
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

export async function getUserPoint() {
  const user = await getCurrentUserWithProfile();

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/user-points/user/${user.user.id}`);

  console.log(res.data.data);
  return res.data.data;
}
