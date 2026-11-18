import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './config';
import { Product } from '../types';

export interface FirestoreOrder {
  orderId: string;
  userId: string;
  customerName: string;
  whatsappPhone: string;
  items: {
    productId: string;
    productName: string;
    size: string;
    color: string;
    quantity: number;
    priceUGX: number;
    subtotalUGX: number;
  }[];
  totalUGX: number;
  status: 'submitted' | 'reviewing' | 'fitting_scheduled' | 'in_production' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FirestoreCustomInquiry {
  inquiryId: string;
  userId: string;
  fullName: string;
  whatsappPhone: string;
  category: 'women' | 'men' | 'kids' | 'african-wear';
  outfitType: string;
  preferredColor?: string;
  measurementsOrSize?: string;
  occasion?: string;
  desiredDate?: string;
  budgetRangeUGX?: string;
  additionalNotes?: string;
  status: 'submitted' | 'consultation_scheduled' | 'sketching' | 'fabric_sourced' | 'fitting' | 'delivered';
  createdAt: string;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  email: string;
  phone?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Save or update user profile
 */
export async function saveUserProfile(data: Partial<UserProfile> & { userId: string; email: string }) {
  const path = `users/${data.userId}`;
  try {
    const docRef = doc(db, 'users', data.userId);
    const existing = await getDoc(docRef);
    const payload = {
      userId: data.userId,
      email: data.email,
      displayName: data.displayName || '',
      phone: data.phone || '',
      location: data.location || 'Kampala, Uganda',
      createdAt: existing.exists() ? existing.data()?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await setDoc(docRef, payload, { merge: true });
    return payload;
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

/**
 * Get user profile
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const path = `users/${userId}`;
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path);
  }
}

/**
 * Save new customer order into Firestore
 */
export async function createOrder(
  order: Omit<FirestoreOrder, 'orderId' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<string> {
  const orderId = `ord-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const path = `orders/${orderId}`;
  try {
    const newOrder: FirestoreOrder = {
      ...order,
      orderId,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'orders', orderId), newOrder);
    return orderId;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

/**
 * Fetch orders for authenticated customer
 */
export async function getCustomerOrders(userId: string): Promise<FirestoreOrder[]> {
  const path = 'orders';
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    const results: FirestoreOrder[] = [];
    snapshot.forEach((doc) => results.push(doc.data() as FirestoreOrder));
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

/**
 * Fetch all orders for atelier admin
 */
export async function getAllOrdersForAdmin(): Promise<FirestoreOrder[]> {
  const path = 'orders';
  try {
    const snapshot = await getDocs(collection(db, 'orders'));
    const results: FirestoreOrder[] = [];
    snapshot.forEach((doc) => results.push(doc.data() as FirestoreOrder));
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

/**
 * Update order status (Admin)
 */
export async function updateOrderStatus(orderId: string, status: FirestoreOrder['status']) {
  const path = `orders/${orderId}`;
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

/**
 * Save bespoke custom couture design inquiry
 */
export async function createCustomInquiry(
  inquiry: Omit<FirestoreCustomInquiry, 'inquiryId' | 'status' | 'createdAt'>
): Promise<string> {
  const inquiryId = `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const path = `custom_inquiries/${inquiryId}`;
  try {
    const newInquiry: FirestoreCustomInquiry = {
      ...inquiry,
      inquiryId,
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'custom_inquiries', inquiryId), newInquiry);
    return inquiryId;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

/**
 * Fetch custom inquiries for authenticated customer
 */
export async function getCustomerInquiries(userId: string): Promise<FirestoreCustomInquiry[]> {
  const path = 'custom_inquiries';
  try {
    const q = query(
      collection(db, 'custom_inquiries'),
      where('userId', '==', userId)
    );
    const snapshot = await getDocs(q);
    const results: FirestoreCustomInquiry[] = [];
    snapshot.forEach((doc) => results.push(doc.data() as FirestoreCustomInquiry));
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

/**
 * Fetch all custom inquiries for atelier admin
 */
export async function getAllInquiriesForAdmin(): Promise<FirestoreCustomInquiry[]> {
  const path = 'custom_inquiries';
  try {
    const snapshot = await getDocs(collection(db, 'custom_inquiries'));
    const results: FirestoreCustomInquiry[] = [];
    snapshot.forEach((doc) => results.push(doc.data() as FirestoreCustomInquiry));
    return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

/**
 * Update custom inquiry status (Admin)
 */
export async function updateInquiryStatus(inquiryId: string, status: FirestoreCustomInquiry['status']) {
  const path = `custom_inquiries/${inquiryId}`;
  try {
    await updateDoc(doc(db, 'custom_inquiries', inquiryId), { status });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

/**
 * Wishlist management
 */
export async function toggleWishlistItem(userId: string, product: Product, isFav: boolean) {
  const path = `wishlists/${userId}/items/${product.id}`;
  try {
    const itemRef = doc(db, 'wishlists', userId, 'items', product.id);
    if (isFav) {
      await deleteDoc(itemRef);
    } else {
      await setDoc(itemRef, {
        productId: product.id,
        productName: product.name,
        priceUGX: product.priceUGX,
        image: product.image,
        category: product.category,
        addedAt: new Date().toISOString(),
      });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

export async function getUserWishlist(userId: string): Promise<string[]> {
  const path = `wishlists/${userId}/items`;
  try {
    const snapshot = await getDocs(collection(db, 'wishlists', userId, 'items'));
    const ids: string[] = [];
    snapshot.forEach((doc) => ids.push(doc.id));
    return ids;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

/**
 * Designs Management (Add, List, Delete)
 */
export interface FirestoreDesignRecord {
  id: string;
  name: string;
  category: 'women' | 'men' | 'kids' | 'african-wear';
  subcategory: string;
  priceUGX: number;
  originalPriceUGX?: number;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  image: string;
  isReadyMade: boolean;
  isCustomCouture: boolean;
  isAfricanWear?: boolean;
  stockStatus: 'in-stock' | 'made-to-order' | 'low-stock';
  tags: string[];
  designerName: string;
  userId?: string;
  createdAt: string;
}

const LOCAL_DESIGNS_KEY = 'cfc_local_custom_designs';

export function getLocalDesigns(): FirestoreDesignRecord[] {
  try {
    const data = localStorage.getItem(LOCAL_DESIGNS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLocalDesign(design: FirestoreDesignRecord): void {
  try {
    const current = getLocalDesigns();
    const filtered = current.filter((d) => d.id !== design.id);
    localStorage.setItem(LOCAL_DESIGNS_KEY, JSON.stringify([design, ...filtered]));
  } catch (e) {
    console.error('Failed to save design to localStorage', e);
  }
}

export async function createDesignInFirestore(design: FirestoreDesignRecord): Promise<void> {
  // Always save locally first for instant reactivity
  saveLocalDesign(design);

  const path = `designs/${design.id}`;
  try {
    await setDoc(doc(db, 'designs', design.id), {
      ...design,
      createdAt: design.createdAt || new Date().toISOString(),
    });
  } catch (err) {
    // If firestore fails (e.g. offline), local storage still retains the design
    console.warn('Firestore write warning:', err);
  }
}

export async function getAllDesignsFromFirestore(): Promise<FirestoreDesignRecord[]> {
  const local = getLocalDesigns();
  const path = 'designs';
  try {
    const snapshot = await getDocs(collection(db, 'designs'));
    const remote: FirestoreDesignRecord[] = [];
    snapshot.forEach((doc) => remote.push(doc.data() as FirestoreDesignRecord));

    // Merge remote and local by id, remote taking precedence
    const mergedMap = new Map<string, FirestoreDesignRecord>();
    local.forEach((d) => mergedMap.set(d.id, d));
    remote.forEach((d) => mergedMap.set(d.id, d));

    return Array.from(mergedMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (err) {
    console.warn('Falling back to local designs:', err);
    return local;
  }
}

export async function deleteDesignFromFirestore(designId: string): Promise<void> {
  try {
    const local = getLocalDesigns().filter((d) => d.id !== designId);
    localStorage.setItem(LOCAL_DESIGNS_KEY, JSON.stringify(local));
  } catch {}

  const path = `designs/${designId}`;
  try {
    await deleteDoc(doc(db, 'designs', designId));
  } catch (err) {
    console.warn('Firestore delete warning:', err);
  }
}

