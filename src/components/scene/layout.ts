/**
 * Room zones (plan view, meters):
 *
 * -Z   TV / living          +Z  entrance
 * ┌──────────┬─────────────┐
 * │ LIVING   │   KITCHEN   │  z < 2.5
 * │          │  (x > 4.5)  │
 * ├──────────┼─────────────┤  z = 2.75 wall
 * │ DINING   │   BEDROOM   │  z > 2.5
 * └──────────┴─────────────┘
 */

/** Kitchen counter height — appliance tops sit on this Y. */
export const COUNTER_Y = 0.92

/** Right-wall kitchen run (cabinets face -X into room). */
export const KITCHEN_X = 6.15
export const KITCHEN_Z = {
  fridge: -4.1,     // یخچال در انتهای خط آشپزخانه قرار گرفت
  sink: -2.2,       // سینک ظرفشویی روی کانتر
  dishwasher: -2.7, // ماشین ظرفشویی زیر کانتر و کنار سینک
  stove: -3,      // اجاق گاز (حالا دقیقاً روی بدنه کابینت قرار می‌گیره)
  microwave: -1.4,  // مایکروویو در انتهای کانتر نزدیک به فضای باز
  cabinets: -2.2,   // مرکز باکس کابینت‌ها که حالا تمام وسایل بالا رو پوشش میده
}

/** Bedroom (behind kitchen, separated by wall at z ≈ 2.75). */
export const BEDROOM = {
  // تخت کاملاً چسبید به دیوار راست (X=6.15) و بخش بالایی آن نزدیک دیوار پشتی (Z=2.75) قرار گرفت
  bed: [6, 0, 4.8] as [number, number, number],       
  
  // پاتختی دقیقاً در سمت چپ تخت (فضای باز اتاق) و هم‌تراز با بالای تخت تنظیم شد
  sideTable: [5, 0, 5.5] as [number, number, number], 
  
  // ماشین لباسشویی به دورترین گوشه اتاق منتقل شد تا فضای مفید وسط اتاق رو اشغال نکنه
  washer: [6.3, 0, 0.2] as [number, number, number],    
}