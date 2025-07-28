const mongoose = require('mongoose');
const { Schema } = mongoose;

// ============================================
// MAIN ADMIN SETTINGS SCHEMA
// ============================================
const adminSettingsSchema = new Schema({
  settingKey: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  settingValue: {
    type: Schema.Types.Mixed, // Can store any type of value
    required: true
  },
  settingType: {
    type: String,
    enum: ['boolean', 'string', 'number', 'object', 'array'],
    required: true
  },
  category: {
    type: String,
    enum: ['food', 'pricing', 'orders', 'content', 'users', 'system', 'notifications'],
    required: true,
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  isSystemCritical: {
    type: Boolean,
    default: false
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true,
  collection: 'adminSettings'
});

// ============================================
// FOOD MANAGEMENT SETTINGS SCHEMA
// ============================================
const foodCategorySubSchema = new Schema({
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'FoodCategory',
    required: true
  },
  categoryName: {
    type: String,
    required: true,
    trim: true
  },
  isEnabled: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  itemCount: {
    type: Number,
    default: 0
  }
}, { _id: false });

const foodSettingsSchema = new Schema({
  allFoodsEnabled: {
    type: Boolean,
    default: true,
    required: true
  },
  globalAvailability: {
    type: Boolean,
    default: true
  },
  autoDisableOutOfStock: {
    type: Boolean,
    default: false
  },
  showUnavailableItems: {
    type: Boolean,
    default: true
  },
  categories: [foodCategorySubSchema],
  specialSettings: {
    allowPreOrders: {
      type: Boolean,
      default: true
    },
    maxPreOrderDays: {
      type: Number,
      default: 7
    },
    enableFoodRatings: {
      type: Boolean,
      default: true
    }
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true,
  collection: 'foodSettings'
});

// ============================================
// PRICING SETTINGS SCHEMA
// ============================================

const quickActionSubSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  adjustment: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed', 'rounding'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { _id: false });

const pricingSettingsSchema = new Schema({
  globalPriceAdjustment: {
    type: Number,
    default: 0.0,
    min: -100,
    max: 1000
  },
  taxRate: {
    type: Number,
    default: 0.0,
    min: 0,
    max: 100
  },
  serviceCharge: {
    type: Number,
    default: 0.0,
    min: 0
  },
  deliveryCharge: {
    type: Number,
    default: 0.0,
    min: 0
  },
  minimumOrderAmount: {
    type: Number,
    default: 0.0,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true,
    maxlength: 3
  },
  priceRounding: {
    enabled: {
      type: Boolean,
      default: false
    },
    method: {
      type: String,
      enum: ['up', 'down', 'nearest'],
      default: 'nearest'
    }
  },
  autoApplyDiscounts: {
    type: Boolean,
    default: true
  },
  quickActions: [quickActionSubSchema],
  discountSettings: {
    maxDiscountPercentage: {
      type: Number,
      default: 50,
      min: 0,
      max: 100
    },
    allowCombineDiscounts: {
      type: Boolean,
      default: false
    }
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true,
  collection: 'pricingSettings'
});

// ============================================
// PRICE ADJUSTMENT HISTORY SCHEMA
// ============================================

const priceAdjustmentHistorySchema = new Schema({
  adjustmentPercentage: {
    type: Number,
    required: true
  },
  adjustmentType: {
    type: String,
    enum: ['increase', 'decrease', 'set', 'round'],
    required: true
  },
  affectedItemsCount: {
    type: Number,
    default: 0
  },
  affectedCategories: [{
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'FoodCategory'
    },
    categoryName: String,
    itemsAffected: Number
  }],
  reason: {
    type: String,
    trim: true
  },
  appliedBy: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser',
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'priceAdjustmentHistory'
});

// ============================================
// ORDER MANAGEMENT SETTINGS SCHEMA
// ============================================
const orderSettingsSchema = new Schema({
  autoDeleteUncheckedOrders: {
    type: Boolean,
    default: false
  },
  uncheckedOrderRetentionDays: {
    type: Number,
    default: 7,
    min: 1
  },
  orderStatuses: [{
    status: {
      type: String,
      required: true,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#000000'
    }
  }],
  notifications: {
    newOrderAlert: {
      type: Boolean,
      default: true
    },
    orderStatusUpdate: {
      type: Boolean,
      default: true
    },
    dailyOrderSummary: {
      type: Boolean,
      default: true
    }
  },
  statistics: {
    trackOrderTimes: {
      type: Boolean,
      default: true
    },
    trackCustomerSatisfaction: {
      type: Boolean,
      default: true
    }
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true,
  collection: 'orderSettings'
});

// ============================================
// CONTENT MANAGEMENT SETTINGS SCHEMA
// ============================================
const mediaFileSubSchema = new Schema({
  fileName: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, { _id: true });

const contentSettingsSchema = new Schema({
  banners: {
    files: [mediaFileSubSchema],
    maxFiles: {
      type: Number,
      default: 10
    },
    autoRotate: {
      type: Boolean,
      default: true
    },
    rotationInterval: {
      type: Number,
      default: 5000 // milliseconds
    }
  },
  certificates: {
    files: [mediaFileSubSchema],
    showOnHomepage: {
      type: Boolean,
      default: true
    },
    maxFiles: {
      type: Number,
      default: 20
    }
  },
  specialFoods: {
    files: [mediaFileSubSchema],
    maxFiles: {
      type: Number,
      default: 6
    },
    showOnHomepage: {
      type: Boolean,
      default: true
    }
  },
  logoSettings: {
    primaryLogo: mediaFileSubSchema,
    secondaryLogo: mediaFileSubSchema,
    favicon: mediaFileSubSchema
  },
  seoSettings: {
    metaTitle: {
      type: String,
      maxlength: 60,
      trim: true
    },
    metaDescription: {
      type: String,
      maxlength: 160,
      trim: true
    },
    keywords: [{
      type: String,
      trim: true
    }]
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true,
  collection: 'contentSettings'
});

// ============================================
// USER MANAGEMENT SETTINGS SCHEMA
// ============================================
const userSettingsSchema = new Schema({
  registrationSettings: {
    allowNewRegistrations: {
      type: Boolean,
      default: true
    },
    requireEmailVerification: {
      type: Boolean,
      default: true
    },
    requirePhoneVerification: {
      type: Boolean,
      default: false
    },
    defaultUserRole: {
      type: String,
      default: 'customer',
      enum: ['customer', 'vip', 'premium']
    }
  },
  loginSettings: {
    maxLoginAttempts: {
      type: Number,
      default: 5,
      min: 1
    },
    lockoutDuration: {
      type: Number,
      default: 30, // minutes
      min: 1
    },
    sessionTimeout: {
      type: Number,
      default: 1440, // minutes (24 hours)
      min: 60
    }
  },
  notificationSettings: {
    welcomeEmail: {
      type: Boolean,
      default: true
    },
    orderConfirmation: {
      type: Boolean,
      default: true
    },
    promotionalEmails: {
      type: Boolean,
      default: false
    },
    smsNotifications: {
      type: Boolean,
      default: false
    }
  },
  privacySettings: {
    dataRetentionDays: {
      type: Number,
      default: 365,
      min: 30
    },
    allowDataExport: {
      type: Boolean,
      default: true
    },
    requireConsentForMarketing: {
      type: Boolean,
      default: true
    }
  },
  statistics: {
    totalUsers: {
      type: Number,
      default: 0
    },
    activeUsersToday: {
      type: Number,
      default: 0
    },
    newUsersThisWeek: {
      type: Number,
      default: 0
    },
    vipMembers: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true,
  collection: 'userSettings'
});

// ============================================
// SYSTEM SETTINGS SCHEMA
// ============================================
const systemSettingsSchema = new Schema({
  maintenance: {
    isEnabled: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: 'We are currently performing maintenance. Please check back soon.',
      trim: true
    },
    allowedIPs: [{
      type: String,
      trim: true
    }],
    scheduledStart: Date,
    scheduledEnd: Date
  },
  features: {
    onlineOrdering: {
      type: Boolean,
      default: true
    },
    emailNotifications: {
      type: Boolean,
      default: true
    },
    smsNotifications: {
      type: Boolean,
      default: false
    },
    loyaltyProgram: {
      type: Boolean,
      default: false
    },
    reviewSystem: {
      type: Boolean,
      default: true
    }
  },
  backupSettings: {
    autoBackupEnabled: {
      type: Boolean,
      default: true
    },
    backupFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily'
    },
    backupRetentionDays: {
      type: Number,
      default: 30,
      min: 7
    },
    lastBackupDate: Date,
    nextBackupDate: Date
  },
  security: {
    rateLimitEnabled: {
      type: Boolean,
      default: true
    },
    maxRequestsPerMinute: {
      type: Number,
      default: 100,
      min: 10
    },
    enableTwoFactorAuth: {
      type: Boolean,
      default: false
    },
    passwordPolicy: {
      minLength: {
        type: Number,
        default: 8,
        min: 6
      },
      requireUppercase: {
        type: Boolean,
        default: true
      },
      requireNumbers: {
        type: Boolean,
        default: true
      },
      requireSpecialChars: {
        type: Boolean,
        default: false
      }
    }
  },
  systemInfo: {
    version: {
      type: String,
      default: '1.0.0'
    },
    environment: {
      type: String,
      enum: ['development', 'staging', 'production'],
      default: 'development'
    },
    storageUsed: {
      type: Number,
      default: 0 // in bytes
    },
    storageLimit: {
      type: Number,
      default: 10737418240 // 10GB in bytes
    },
    activeSessions: {
      type: Number,
      default: 0
    }
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true,
  collection: 'systemSettings'
});

// ============================================
// NOTIFICATION SETTINGS SCHEMA
// ============================================
const notificationSettingsSchema = new Schema({
  emailSettings: {
    smtpHost: {
      type: String,
      trim: true
    },
    smtpPort: {
      type: Number,
      default: 587
    },
    smtpUser: {
      type: String,
      trim: true
    },
    smtpPassword: {
      type: String,
      select: false 
    },
    fromEmail: {
      type: String,
      trim: true
    },
    fromName: {
      type: String,
      trim: true
    },
    enableTLS: {
      type: Boolean,
      default: true
    }
  },
  smsSettings: {
    provider: {
      type: String,
      enum: ['twilio', 'aws-sns', 'nexmo'],
      default: 'twilio'
    },
    apiKey: {
      type: String,
      select: false
    },
    apiSecret: {
      type: String,
      select: false
    },
    fromNumber: {
      type: String,
      trim: true
    }
  },
  pushNotificationSettings: {
    firebaseServerKey: {
      type: String,
      select: false
    },
    enablePushNotifications: {
      type: Boolean,
      default: false
    }
  },
  notificationTypes: [{
    type: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    },
    push: {
      type: Boolean,
      default: false
    },
    inApp: {
      type: Boolean,
      default: true
    }
  }],
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'AdminUser'
  }
}, {
  timestamps: true,
  collection: 'notificationSettings'
});

// ============================================
// INDEXES FOR PERFORMANCE
// ============================================

// AdminSettings indexes
adminSettingsSchema.index({ settingKey: 1 });
adminSettingsSchema.index({ category: 1 });
adminSettingsSchema.index({ isSystemCritical: 1 });

// FoodSettings indexes
foodSettingsSchema.index({ 'categories.categoryId': 1 });
foodSettingsSchema.index({ 'categories.isEnabled': 1 });

// PriceAdjustmentHistory indexes
priceAdjustmentHistorySchema.index({ appliedAt: -1 });
priceAdjustmentHistorySchema.index({ appliedBy: 1 });

// ContentSettings indexes
contentSettingsSchema.index({ 'banners.files.isActive': 1 });
contentSettingsSchema.index({ 'specialFoods.files.isActive': 1 });

// ============================================
// VIRTUAL FIELDS AND METHODS
// ============================================

// Virtual for storage usage percentage
systemSettingsSchema.virtual('storageUsagePercentage').get(function() {
  return ((this.systemInfo.storageUsed / this.systemInfo.storageLimit) * 100).toFixed(2);
});

// Method to check if maintenance mode is active
systemSettingsSchema.methods.isMaintenanceActive = function() {
  if (!this.maintenance.isEnabled) return false;
  
  const now = new Date();
  if (this.maintenance.scheduledStart && this.maintenance.scheduledEnd) {
    return now >= this.maintenance.scheduledStart && now <= this.maintenance.scheduledEnd;
  }
  
  return this.maintenance.isEnabled;
};

// Static method to get setting by key
adminSettingsSchema.statics.getSetting = function(key) {
  return this.findOne({ settingKey: key });
};

// Static method to update setting
adminSettingsSchema.statics.updateSetting = function(key, value, updatedBy) {
  return this.findOneAndUpdate(
    { settingKey: key },
    { 
      settingValue: value, 
      updatedBy: updatedBy,
      updatedAt: new Date()
    },
    { new: true, upsert: true }
  );
};

// ============================================
// MIDDLEWARE
// ============================================

// Pre-save middleware to update timestamps
adminSettingsSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Pre-update middleware for price adjustments
priceAdjustmentHistorySchema.pre('save', function(next) {
  if (this.isNew) {
    this.appliedAt = new Date();
  }
  next();
});

// ============================================
// MODEL EXPORTS
// ============================================
const AdminSettings = mongoose.model('AdminSettings', adminSettingsSchema);
const FoodSettings = mongoose.model('FoodSettings', foodSettingsSchema);
const PricingSettings = mongoose.model('PricingSettings', pricingSettingsSchema);
const PriceAdjustmentHistory = mongoose.model('PriceAdjustmentHistory', priceAdjustmentHistorySchema);
const OrderSettings = mongoose.model('OrderSettings', orderSettingsSchema);
const ContentSettings = mongoose.model('ContentSettings', contentSettingsSchema);
const UserSettings = mongoose.model('UserSettings', userSettingsSchema);
const SystemSettings = mongoose.model('SystemSettings', systemSettingsSchema);
const NotificationSettings = mongoose.model('NotificationSettings', notificationSettingsSchema);

module.exports = {
  AdminSettings,
  FoodSettings,
  PricingSettings,
  PriceAdjustmentHistory,
  OrderSettings,
  ContentSettings,
  UserSettings,
  SystemSettings,
  NotificationSettings
};

// ============================================
// USAGE EXAMPLES
// ============================================

/* 
// Example: Initialize default settings
const initializeDefaultSettings = async () => {
  try {
    // Initialize system settings
    const systemSettings = new SystemSettings({
      maintenance: { isEnabled: false },
      features: {
        onlineOrdering: true,
        emailNotifications: true,
        smsNotifications: false
      }
    });
    await systemSettings.save();

    // Initialize food settings
    const foodSettings = new FoodSettings({
      allFoodsEnabled: true,
      globalAvailability: true,
      categories: []
    });
    await foodSettings.save();

    // Initialize pricing settings
    const pricingSettings = new PricingSettings({
      globalPriceAdjustment: 0,
      currency: 'USD',
      quickActions: [
        { name: '+10% Increase', adjustment: 10, type: 'percentage' },
        { name: '-10% Decrease', adjustment: -10, type: 'percentage' },
        { name: 'Round Prices', adjustment: 0, type: 'rounding' }
      ]
    });
    await pricingSettings.save();

    console.log('Default settings initialized successfully');
  } catch (error) {
    console.error('Error initializing default settings:', error);
  }
};

// Example: Update a setting
const updateSystemSetting = async (key, value, adminUserId) => {
  try {
    const setting = await AdminSettings.updateSetting(key, value, adminUserId);
    console.log('Setting updated:', setting);
  } catch (error) {
    console.error('Error updating setting:', error);
  }
};

// Example: Get all food settings
const getFoodSettings = async () => {
  try {
    const settings = await FoodSettings.findOne().populate('categories.categoryId');
    return settings;
  } catch (error) {
    console.error('Error fetching food settings:', error);
  }
};
*/