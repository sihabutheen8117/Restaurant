import { Foods } from '../mongoose/schema/Foods.mjs'
import cron from 'node-cron'

export function startOfferCleanupJob() {
    cron.schedule('0 0 * * *', async () => {
      const now = new Date();
      try {
        const expiredFoods = await Foods.find({
          offer_validity: { $lte: now },
          offer_price: { $ne: -1 }
        });
        if (expiredFoods.length === 0) {
          console.log('No expired offers to update.');
          return;
        }
        await Foods.bulkWrite(
          expiredFoods.map(food => ({
            updateOne: {
              filter: { _id: food._id },
              update: { $set: { offer_price: -1 } }
            }
          }))
        );
        console.log(`Updated ${expiredFoods.length} food item(s).`);
      } catch (err) {
        console.error('Error updating food offers:', err);
      }
    });
  }