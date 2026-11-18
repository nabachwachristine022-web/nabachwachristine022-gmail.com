import React, { useState, useEffect } from 'react';
import {
  X,
  User as UserIcon,
  ShoppingBag,
  Sparkles,
  LogOut,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { useAuth, ADMIN_EMAIL } from '../firebase/AuthContext';
import {
  getCustomerOrders,
  getAllOrdersForAdmin,
  updateOrderStatus,
  getCustomerInquiries,
  getAllInquiriesForAdmin,
  updateInquiryStatus,
  saveUserProfile,
  FirestoreOrder,
  FirestoreCustomInquiry,
} from '../firebase/firestoreService';
import { formatUGX } from '../config/brand';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, userProfile, isAdmin, signInWithGoogle, logout, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'inquiries' | 'admin'>('profile');
  const [userOrders, setUserOrders] = useState<FirestoreOrder[]>([]);
  const [userInquiries, setUserInquiries] = useState<FirestoreCustomInquiry[]>([]);
  const [adminOrders, setAdminOrders] = useState<FirestoreOrder[]>([]);
  const [adminInquiries, setAdminInquiries] = useState<FirestoreCustomInquiry[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Profile Edit State
  const [editPhone, setEditPhone] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setEditPhone(userProfile.phone || '');
      setEditLocation(userProfile.location || 'Kampala, Uganda');
    }
  }, [userProfile]);

  // Load customer or admin data
  const loadData = async () => {
    if (!currentUser) return;
    setIsLoadingData(true);
    try {
      if (isAdmin) {
        const [aOrders, aInq] = await Promise.all([
          getAllOrdersForAdmin(),
          getAllInquiriesForAdmin(),
        ]);
        setAdminOrders(aOrders || []);
        setAdminInquiries(aInq || []);
      }
      const [uOrders, uInq] = await Promise.all([
        getCustomerOrders(currentUser.uid),
        getCustomerInquiries(currentUser.uid),
      ]);
      setUserOrders(uOrders || []);
      setUserInquiries(uInq || []);
    } catch (e) {
      console.warn('Error loading Firestore records', e);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      loadData();
    }
  }, [isOpen, currentUser, isAdmin]);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      await saveUserProfile({
        userId: currentUser.uid,
        email: currentUser.email || '',
        displayName: currentUser.displayName || '',
        phone: editPhone,
        location: editLocation,
      });
      await refreshProfile();
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: FirestoreOrder['status']) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setAdminOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (e) {
      console.error('Failed to update order status', e);
    }
  };

  const handleInquiryStatusChange = async (
    inquiryId: string,
    newStatus: FirestoreCustomInquiry['status']
  ) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus);
      setAdminInquiries((prev) =>
        prev.map((i) => (i.inquiryId === inquiryId ? { ...i, status: newStatus } : i))
      );
    } catch (e) {
      console.error('Failed to update inquiry status', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FCFBF7] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-stone-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FCE7EC] flex items-center justify-center text-[#B83259]">
              <UserIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                {currentUser ? `Welcome, ${currentUser.displayName || 'Client'}` : 'CFC Client Account'}
              </h3>
              <p className="text-[11px] text-stone-500">
                {currentUser
                  ? isAdmin
                    ? '✦ CFC Atelier Administrator'
                    : 'Personal couture orders & fitting records'
                  : 'Sign in to track orders, saved fittings & custom inquiries'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {!currentUser ? (
            <div className="text-center py-8 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#FAF4E8] text-[#C5A059] flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Connect with Christine Fashion Couture
              </h4>
              <p className="text-xs text-stone-600 mb-6 leading-relaxed">
                Signing in saves your measurement records, pre-fills your Ugandan WhatsApp details,
                and maintains your historical orders and bespoke design requests in one secure place.
              </p>

              <button
                onClick={signInWithGoogle}
                className="w-full py-3.5 px-6 rounded-md bg-white border border-stone-300 hover:border-stone-400 text-stone-800 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-3 shadow-xs transition-all hover:shadow-sm"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign In with Google</span>
              </button>

              <p className="text-[11px] text-stone-500 mt-4">
                Secure authentication powered by Firebase. No passwords required.
              </p>
            </div>
          ) : (
            <div>
              {/* Tab Navigation */}
              <div className="flex items-center gap-1 border-b border-stone-200 pb-2 mb-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'bg-[#B83259] text-white'
                      : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                  }`}
                >
                  My Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'orders'
                      ? 'bg-[#B83259] text-white'
                      : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                  }`}
                >
                  My Orders ({userOrders.length})
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'inquiries'
                      ? 'bg-[#B83259] text-white'
                      : 'text-stone-600 hover:text-stone-900 bg-stone-100'
                  }`}
                >
                  Bespoke Inquiries ({userInquiries.length})
                </button>

                {isAdmin && (
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                      activeTab === 'admin'
                        ? 'bg-[#C5A059] text-stone-900'
                        : 'text-[#856524] bg-[#FAF4E8] font-semibold'
                    }`}
                  >
                    👑 Atelier Admin Portal
                  </button>
                )}

                <button
                  onClick={loadData}
                  className="p-1.5 text-stone-400 hover:text-stone-700 ml-auto"
                  title="Refresh records"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* TAB 1: Profile */}
              {activeTab === 'profile' && (
                <div className="space-y-5">
                  <div className="bg-white p-5 rounded-lg border border-stone-200">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-3">
                      Client Contact &amp; Fitting Preferences
                    </h4>
                    {profileSaved && (
                      <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Profile details updated successfully!</span>
                      </div>
                    )}
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div>
                        <label className="block text-xs text-stone-600 mb-1">Email Address</label>
                        <input
                          type="text"
                          disabled
                          value={currentUser.email || ''}
                          className="w-full text-xs px-3 py-2 bg-stone-100 text-stone-500 rounded border border-stone-200"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-stone-700 font-medium mb-1">
                            WhatsApp / Mobile Phone (Uganda)
                          </label>
                          <input
                            type="tel"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            placeholder="e.g. 0772 963 428"
                            className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-stone-700 font-medium mb-1">
                            Delivery City / Address
                          </label>
                          <input
                            type="text"
                            value={editLocation}
                            onChange={(e) => setEditLocation(e.target.value)}
                            placeholder="e.g. Kampala, Kololo, Jinja"
                            className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded focus:bg-white focus:outline-none focus:border-[#B83259]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="py-2 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#B83259] hover:bg-[#982446] rounded transition-colors"
                      >
                        Save Preferences
                      </button>
                    </form>
                  </div>

                  <div className="pt-2 flex justify-between items-center text-xs text-stone-500">
                    <span>Account UID: {currentUser.uid.slice(0, 10)}...</span>
                    <button
                      onClick={logout}
                      className="text-red-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: Orders */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {userOrders.length > 0 ? (
                    userOrders.map((ord) => (
                      <div
                        key={ord.orderId}
                        className="p-4 bg-white border border-stone-200 rounded-lg shadow-xs space-y-2.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-mono font-semibold text-stone-900">
                              #{ord.orderId}
                            </span>
                            <span className="text-stone-400 text-[11px] ml-2">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                              ord.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'in_production'
                                ? 'bg-blue-100 text-blue-800'
                                : ord.status === 'fitting_scheduled'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {ord.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="space-y-1 text-xs text-stone-600 pt-1 border-t border-stone-100">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span>
                                {it.productName} ({it.quantity}x, Size: {it.size}, {it.color})
                              </span>
                              <span className="font-mono tabular-nums">{formatUGX(it.subtotalUGX)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                          <span className="text-stone-500">Total in UGX:</span>
                          <span className="font-mono font-bold text-stone-900">
                            {formatUGX(ord.totalUGX)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-white border border-stone-200 rounded-lg">
                      <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                      <p className="text-xs text-stone-600">No placed orders found yet.</p>
                      <p className="text-[11px] text-stone-400 mt-1">
                        When you checkout via WhatsApp, your order summary is automatically logged here.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Custom Inquiries */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  {userInquiries.length > 0 ? (
                    userInquiries.map((inq) => (
                      <div
                        key={inq.inquiryId}
                        className="p-4 bg-white border border-stone-200 rounded-lg shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="font-serif font-bold text-stone-900">
                              {inq.outfitType}
                            </span>
                            <span className="text-stone-400 text-[11px] ml-2">
                              ({inq.category.toUpperCase()})
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#FAF4E8] text-[#856524]">
                            {inq.status.replace('_', ' ')}
                          </span>
                        </div>

                        <div className="text-xs text-stone-600 space-y-1">
                          {inq.preferredColor && <p>Colour: {inq.preferredColor}</p>}
                          {inq.measurementsOrSize && <p>Fitting: {inq.measurementsOrSize}</p>}
                          {inq.budgetRangeUGX && <p>Budget: {inq.budgetRangeUGX}</p>}
                        </div>

                        <p className="text-[11px] text-stone-400 pt-1 border-t border-stone-100">
                          Submitted on {new Date(inq.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-white border border-stone-200 rounded-lg">
                      <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                      <p className="text-xs text-stone-600">No bespoke design requests yet.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: Admin Portal */}
              {isAdmin && activeTab === 'admin' && (
                <div className="space-y-6">
                  <div className="p-3 bg-[#FAF4E8] border border-[#C5A059]/40 rounded text-xs text-[#856524]">
                    <strong>Atelier Management Mode:</strong> As Christine ({ADMIN_EMAIL}), you can
                    review all customer WhatsApp orders and bespoke couture inquiries, and update their
                    production/fitting stages.
                  </div>

                  {/* All Orders List */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                      All Customer Orders ({adminOrders.length})
                    </h4>
                    <div className="space-y-3">
                      {adminOrders.map((ord) => (
                        <div
                          key={ord.orderId}
                          className="p-3.5 bg-white border border-stone-200 rounded-lg text-xs space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-bold text-stone-900">{ord.customerName}</p>
                              <p className="text-stone-500 font-mono text-[11px]">
                                Phone: {ord.whatsappPhone || 'Provided in WhatsApp'}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] text-stone-500">Status:</span>
                              <select
                                value={ord.status}
                                onChange={(e) =>
                                  handleStatusChange(ord.orderId, e.target.value as any)
                                }
                                className="bg-stone-50 border border-stone-300 rounded px-2 py-0.5 text-xs font-medium"
                              >
                                <option value="submitted">Submitted</option>
                                <option value="reviewing">Reviewing</option>
                                <option value="fitting_scheduled">Fitting Scheduled</option>
                                <option value="in_production">In Production</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>
                          </div>

                          <div className="border-t border-stone-100 pt-1 text-[11px] text-stone-600">
                            {ord.items.map((it, idx) => (
                              <p key={idx}>
                                • {it.productName} ({it.quantity}x, {it.size}, {it.color})
                              </p>
                            ))}
                          </div>

                          <div className="flex justify-between items-center text-[11px] pt-1 border-t border-stone-100 font-semibold">
                            <span>Amount: {formatUGX(ord.totalUGX)}</span>
                            <span className="text-stone-400 font-normal">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* All Bespoke Inquiries */}
                  <div className="pt-4 border-t border-stone-200">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-3">
                      All Bespoke Design Requests ({adminInquiries.length})
                    </h4>
                    <div className="space-y-3">
                      {adminInquiries.map((inq) => (
                        <div
                          key={inq.inquiryId}
                          className="p-3.5 bg-white border border-stone-200 rounded-lg text-xs space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-bold text-stone-900">{inq.fullName}</p>
                              <p className="text-stone-600">
                                {inq.outfitType} ({inq.category})
                              </p>
                            </div>
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                handleInquiryStatusChange(inq.inquiryId, e.target.value as any)
                              }
                              className="bg-stone-50 border border-stone-300 rounded px-2 py-0.5 text-xs font-medium"
                            >
                              <option value="submitted">Submitted</option>
                              <option value="consultation_scheduled">Consultation Scheduled</option>
                              <option value="sketching">Sketching</option>
                              <option value="fabric_sourced">Fabric Sourced</option>
                              <option value="fitting">Fitting</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </div>
                          <p className="text-[11px] text-stone-500">{inq.additionalNotes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
