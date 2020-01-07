import Stripe from 'stripe';
import { STRIPE_KEY } from '../config/config';

const stripe = Stripe(STRIPE_KEY);

export default stripe;