// models/User.js - Complete Mongoose Schema
import {Schema, model} from 'mongoose';
import { emailRegex, mobileRegex } from '../../utils/regex.js';
import { USER_ROLES } from '../../utils/index.js';

const addressSchema = new Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    addressType: { 
        type: String, 
        enum: ['home', 'work', 'other'], 
        default: 'home' 
    },
    isDefault: { type: Boolean, default: false }
});

const wishlistItemSchema = new Schema({
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product',
        required: true 
    },
    addedAt: { type: Date, default: Date.now }
});

const userSchema = new Schema({
    personalInfo: {
        firstName: { 
            type: String, 
            // required: [true, 'First name is required'],
            trim: true,
            maxlength: 50
        },
        lastName: { 
            type: String, 
            trim: true,
            maxlength: 50 
        },
        username: { 
            type: String, 
            unique: true, 
            required: [true, 'userName is Required'],
            index: true,
            sparse: true,  // Allows null values for social auth
            trim: true,
            lowercase: true,
            maxlength: 30
        },
        email: { 
            type: String, 
            unique: true, 
            index: true,
            required: [true, 'email is Required'],
            trim: true,
            lowercase: true,
            match: [emailRegex, 'Please enter a valid email']
        },
        phone: { 
            type: String, 
            unique: true,
            sparse: true,
            match: [mobileRegex, 'Invalid phone number']
        },
        profileImage: {
            type: String,  // URL to S3/Cloudinary
            default: ''
        },
        dateOfBirth: {
            type: Date
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other', 'prefer_not_to_say']
        }
    },
    auth: {
        passwordHash: { 
            type: String, 
            select: false  // Never return in queries
        },
        role: { 
            type: String, 
            enum: USER_ROLES, 
            default: 'user',
            index: true
        },
        isEmailVerified: { type: Boolean, default: false },
        isPhoneVerified: { type: Boolean, default: false },
        refreshTokenHash: { 
            type: String, 
            select: false 
        },
        lastLogin: { type: Date },
        failedLoginAttempts: { type: Number, default: 0 },
        accountLocked: { type: Boolean, default: false }
    },
    addresses: [addressSchema],
    wishlist: [wishlistItemSchema],
    preferences: {
        language: { type: String, default: 'en' },
        currency: { type: String, default: 'USD' },
        theme: { type: String, default: 'light' },
        emailNotifications: { type: Boolean, default: true },
        smsNotifications: { type: Boolean, default: true },
        pushNotifications: { type: Boolean, default: true }
    },
    linksToOtherServices: {
        walletId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Wallet',
            default: null 
        },
        activeCartId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Cart',
            default: null 
        },
        sellerId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Seller',
            default: null 
        }
    },
    stats: { 
        totalOrders: { type: Number, default: 0 },
        totalReviews: { type: Number, default: 0 }
    },
    security: { 
        twoFactorEnabled: { type: Boolean, default: false },
        passwordChangedAt: { type: Date }
    },
    accountStatus: { 
        isActive: { type: Boolean, default: true },
        isSuspended: { type: Boolean, default: false },
        deletedAt: { type: Date },
        passwordSet: { type: Boolean, default: false},
        profileCompleted: { type: Boolean, default: false}
    }
}, {
    timestamps: true,  // Adds createdAt & updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for performance
// userSchema.index({ 'personalInfo.email': 1 });
// userSchema.index({ 'personalInfo.phone': 1 });
// userSchema.index({ 'auth.role': 1 });
// userSchema.index({ 'accountStatus.isActive': 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`.trim();
});

// Middleware to hash password before save
// userSchema.pre('save', async function(next) {
//     if (this.isModified('auth.passwordHash')) {
//         // Hash password logic here (bcrypt)
//     }
//     next();
// });

export default model('User', userSchema);
