"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Settings, 
  Utensils, 
  DollarSign, 
  ShoppingCart, 
  Image, 
  Award, 
  Star, 
  Database,
  ToggleLeft,
  ToggleRight,
  Upload,
  Trash2,
  RotateCcw,
  Users,
  Clock,
  ChefHat,
  Bell,
  Shield,
  Save,
  AlertTriangle,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { get_settings_data } from '@/reactQuery/settingsQuery';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  bulk_food_availability_update,
  global_price_update,
  delete_all_unchecked_orders,
  upload_home_images,
  get_home_images,
  delete_home_images
} from '@/reactQuery/settingsQuery';
import NotificationLoader from '@/components/Loaders/NotificationLoader';
import { useRouter } from 'next/navigation';

export default function AdminSettings() {

  const router = useRouter() ;
  // State management
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);
  const [allDisabled, setAllDisabled] = useState(false);
  const [disabledCategories, setDisabledCategories] = useState([]);
  const [priceDetails, setPriceDetails] = useState({
    type: "per",
    price: "0" 
  });
  
  // Image states
  const [stagedSpcImages, setStagedSpcImages] = useState([]);
  const [stagedCrtImages, setStagedCrtImages] = useState([]);
  const [stagedBnrImages, setStagedBnrImages] = useState([]);

  // Notification states
  const [notification, setNotification] = useState({
    visible: false,
    state: "",
    information: ""
  });
  
  const timeoutRef = useRef(null);
  const queryClient = useQueryClient();

  // Queries
  const settingsData = useQuery({
    queryKey: ['settings_data'],
    queryFn: get_settings_data
  });

  const homeSpcImages = useQuery({
    queryKey: ['home_spc_images'],
    queryFn: () => get_home_images({ folder: "specials" }),
    enabled: false 
  });

  const homeCrtImages = useQuery({
    queryKey: ['home_crt_images'],
    queryFn: () => get_home_images({ folder: "certificates" }),
    enabled: false 
  });

  const homeBnrImages = useQuery({
    queryKey: ['home_bnr_images'],
    queryFn: () => get_home_images({ folder: "banners" }),
    enabled: false 
  });

  // Notification helper function
  const showNotification = useCallback((state, information) => {
    if (notification.visible && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setNotification({
      visible: true,
      state,
      information
    });
    
    timeoutRef.current = setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 5000);
  }, [notification.visible]);

  const hideNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setNotification(prev => ({ ...prev, visible: false }));
  }, []);

  // Mutations
  const updateAvailability = useMutation({
    mutationFn: bulk_food_availability_update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings_data'] });
      showNotification("success", "Foods updated!");
    },
    onError: () => {
      showNotification("danger", "Failed to update foods!");
    }
  });

  const updatePrice = useMutation({
    mutationFn: global_price_update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings_data'] });
      showNotification("success", "Price updated!");
    },
    onError: () => {
      showNotification("danger", "Failed to update price!");
    }
  });

  const deleteUncheckOrders = useMutation({
    mutationFn: delete_all_unchecked_orders,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings_data'] });
      showNotification("success", "Unchecked orders deleted!");
    },
    onError: () => {
      showNotification("danger", "Failed to delete orders!");
    }
  });

  const deleteHomeImagesMutation = useMutation({
    mutationFn: delete_home_images,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home_spc_images'] });
      queryClient.invalidateQueries({ queryKey: ['home_crt_images'] });
      queryClient.invalidateQueries({ queryKey: ['home_bnr_images'] });
      showNotification("success", "Images deleted!");
    },
    onError: () => {
      showNotification("danger", "Failed to delete images!");
    }
  });

  const uploadImagesMutation = useMutation({
    mutationFn: upload_home_images,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['home_spc_images'] });
      queryClient.invalidateQueries({ queryKey: ['home_crt_images'] });
      queryClient.invalidateQueries({ queryKey: ['home_bnr_images'] });
      
      // Clear staged images based on folder
      const { folder } = variables;
      if (folder === 'specials') setStagedSpcImages([]);
      if (folder === 'certificates') setStagedCrtImages([]);
      if (folder === 'banners') setStagedBnrImages([]);
      
      showNotification("success", "Images uploaded successfully!");
    },
    onError: () => {
      showNotification("danger", "Failed to upload images!");
    }
  });

  // Effects
  useEffect(() => {
    if (settingsData.isSuccess) {
      setAllDisabled(settingsData.data.is_all_disabled);
      setDisabledCategories(settingsData.data.categories || []);
    }
  }, [settingsData.isSuccess]);

  useEffect(() => {
    const allAreFalse = disabledCategories.every(cat => cat.allFoodsDisabled === true);
    if (allAreFalse && disabledCategories.length > 0) {
      setAllDisabled(true);
    }
  }, [disabledCategories]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Image handling functions
  const handleImageSelect = useCallback((e, type) => {
    const files = Array.from(e.target.files);
    const withPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    switch (type) {
      case 'special':
        setStagedSpcImages(prev => [...prev, ...withPreview]);
        break;
      case 'certificate':
        setStagedCrtImages(prev => [...prev, ...withPreview]);
        break;
      case 'banner':
        setStagedBnrImages(prev => [...prev, ...withPreview]);
        break;
    }
  }, []);

  const handleImageRemove = useCallback((indexToRemove, type) => {
    const updateState = (prev) => {
      URL.revokeObjectURL(prev[indexToRemove].preview);
      return prev.filter((_, index) => index !== indexToRemove);
    };

    switch (type) {
      case 'special':
        setStagedSpcImages(updateState);
        break;
      case 'certificate':
        setStagedCrtImages(updateState);
        break;
      case 'banner':
        setStagedBnrImages(updateState);
        break;
    }
  }, []);

  const handleImageUpload = useCallback(async (type) => {
    let images, folder;
    
    switch (type) {
      case 'special':
        images = stagedSpcImages;
        folder = 'specials';
        break;
      case 'certificate':
        images = stagedCrtImages;
        folder = 'certificates';
        break;
      case 'banner':
        images = stagedBnrImages;
        folder = 'banners';
        break;
    }

    if (!images || images.length === 0) {
      showNotification("danger", "No images selected for upload!");
      return;
    }

    const formData = new FormData();
    images.forEach(({ file }) => {
      formData.append("images", file);
    });

    uploadImagesMutation.mutate({ formData, folder });
  }, [stagedSpcImages, stagedCrtImages, stagedBnrImages, uploadImagesMutation, showNotification]);

  const handleImageRemoveOne = useCallback((publicId) => {
    deleteHomeImagesMutation.mutate({ public_id: publicId });
  }, [deleteHomeImagesMutation]);

  const clearStagedImages = useCallback((type) => {
    switch (type) {
      case 'special':
        stagedSpcImages.forEach(item => URL.revokeObjectURL(item.preview));
        setStagedSpcImages([]);
        break;
      case 'certificate':
        stagedCrtImages.forEach(item => URL.revokeObjectURL(item.preview));
        setStagedCrtImages([]);
        break;
      case 'banner':
        stagedBnrImages.forEach(item => URL.revokeObjectURL(item.preview));
        setStagedBnrImages([]);
        break;
    }
  }, [stagedSpcImages, stagedCrtImages, stagedBnrImages]);

  // Action handlers
  const confirmAction = (action) => {
    setShowConfirmDialog(action);
  };

  const handleCategoryToggle = useCallback((categoryName) => {
    setDisabledCategories(prev =>
      prev.map(cat =>
        cat.category === categoryName
          ? { ...cat, allFoodsDisabled: !cat.allFoodsDisabled }
          : cat
      )
    );
  }, []);

  // Render functions
  const renderConfirmDialog = () => {
    if (!showConfirmDialog) return null;

    const actions = {
      'delete-orders': {
        title: 'Delete All Unchecked Orders',
        message: 'This will permanently delete all orders that haven\'t been checked out. This action cannot be undone.',
        danger: true,
        action: () => deleteUncheckOrders.mutate()
      },
      'reset-database': {
        title: 'Reset All Database Data (Unavailable)',
        message: 'This will permanently delete ALL data in the database. Please export the data before reset. This action cannot be undone. (Currently unavailable)',
        danger: true,
        action: () => {}
      },
      'changes-price': {
        title: 'Change Prices',
        message: 'This will update the price of all foods. Please ensure the changes are correct as this won\'t be reversible.',
        danger: true,
        action: () => {
          if (priceDetails.price === "0" || priceDetails.price === "") {
            showNotification("danger", "Please enter a valid price!");
            return;
          }
          updatePrice.mutate({
            type : priceDetails.type ,
            price : parseInt( priceDetails.price )
          });
        }
      },
      'disable-foods': {
        title: 'Update Food Availability',
        message: 'This will update the availability of selected foods. Please ensure the changes are correct.',
        danger: true,
        action: () => {
          const finalData = {
            all_disabled: allDisabled,
            disabled_cate: disabledCategories
          };
          updateAvailability.mutate(finalData);
        }
      },
    };

    const action = actions[showConfirmDialog];

    return (
      <div className="">
        <div 
          className='fixed inset-0 bg-black opacity-30 z-40'
          onClick={() => setShowConfirmDialog(null)}
        />
        <div className="fixed bg-white rounded-lg p-6 max-w-md w-full z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold">{action.title}</h3>
          </div>
          <p className="text-gray-600 mb-6">{action.message}</p>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowConfirmDialog(null)}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                action.action();
                setShowConfirmDialog(null);
              }}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                action.danger 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderImageSection = (type, title, icon, images, stagedImages, queryData, color = "blue") => (
    <div className="bg-white rounded-lg shadow-sm border p-6 border-gray-300">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        <div className='w-full'>
          <div className=''>
            {queryData?.isSuccess && queryData.data.images.length > 0 && (
              <>
                <div className='font-semibold text-gray-500'>Live {title}</div>
                <div className='flex gap-4 flex-wrap mt-1'> 
                  {queryData.data.images.map((item, key) => (
                    <div key={key} className={`rounded-md relative ${
                      type === 'banner' ? 'h-[160px] w-[400px]' : 
                      type === 'certificate' ? 'h-[100px] w-[200px]' : 
                      'h-[200px] w-[200px]'
                    }`}>
                      <img
                        src={item.url}
                        alt={`preview-${key}`}
                        className={`object-cover rounded-md ${
                          type === 'banner' ? 'w-[400px] h-[160px]' : 
                          type === 'certificate' ? 'w-[200px] h-[100px]' : 
                          'w-[200px] h-[200px]'
                        }`}
                      />
                      <button 
                        className={`flex absolute text-white font-bold p-1.5 rounded-md top-1 right-1 ${
                          deleteHomeImagesMutation.isPending ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
                        }`}
                        onClick={() => handleImageRemoveOne(item.public_id)}
                        disabled={deleteHomeImagesMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                        {deleteHomeImagesMutation.isPending && (
                          <svg viewBox="25 25 50 50" className='svg_loading text-xs'>
                            <circle r="20" cy="50" cx="50" className='circle_loading stroke-white' />
                          </svg>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {stagedImages.length > 0 && (
              <>
                <div className='font-semibold text-gray-500 mt-3'>Selected {title}</div>
                <div className='flex gap-4 flex-wrap mt-1'>
                  {stagedImages.map((item, idx) => (
                    <div key={idx} className={`rounded-md relative ${
                      type === 'banner' ? 'h-[160px] w-[400px]' : 
                      type === 'certificate' ? 'h-[100px] w-[200px]' : 
                      'h-[200px] w-[200px]'
                    }`}>
                      <img
                        src={item.preview}
                        alt={`preview-${idx}`}
                        className={`object-cover rounded-md ${
                          type === 'banner' ? 'w-[400px] h-[160px]' : 
                          type === 'certificate' ? 'w-[200px] h-[100px]' : 
                          'w-[200px] h-[200px]'
                        }`}
                      />
                      <button 
                        className='absolute bg-red-500 text-white font-bold p-1.5 rounded-md top-1 right-1 hover:bg-red-600'
                        onClick={() => handleImageRemove(idx, type)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          {icon}
          <p className="text-gray-600 mb-2">Upload {title.toLowerCase()}</p>

          <input
            type="file"
            multiple
            accept={type === 'certificate' ? "image/*,.pdf" : "image/*"}
            onChange={(e) => handleImageSelect(e, type)}
            className="hidden"
            id={`${type}-upload`}
          />
          {stagedImages.length > 0 && (
            <button 
              className='bg-red-400 hover:bg-red-500 px-4 py-2 text-white rounded-lg mr-3'
              onClick={() => clearStagedImages(type)}
            >
              <X className="text-white w-5 h-5 inline-flex" /> Cancel
            </button>
          )}
          
          <label
            htmlFor={`${type}-upload`}
            className={`px-4 py-2 bg-${color}-500 text-white rounded-lg hover:bg-${color}-600 transition-colors cursor-pointer inline-block ${color == "" || color == null && "bg-blue-500 hover:bg-blue-600" }`}
          >
            Choose Files
          </label>
          
          {stagedImages.length > 0 && (
            <button 
              className={`px-4 py-2 text-white rounded-lg ml-3 ${
                uploadImagesMutation.isPending ? "bg-blue-300" : "bg-blue-400 hover:bg-blue-500"
              }`}
              onClick={() => handleImageUpload(type)}
              disabled={uploadImagesMutation.isPending}
            > 
              <Upload className="text-white w-5 h-5 inline-flex" /> 
              {uploadImagesMutation.isPending ? (
                <svg viewBox="25 25 50 50" className='svg_loading inline-flex'>
                  <circle r="20" cy="50" cx="50" className='circle_loading stroke-white' />
                </svg>
              ) : (
                "Upload"
              )}
            </button>

          )}
        </div>
      </div>
    </div>
  );

  const renderFoodManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-4 border-gray-300">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold">Food Availability</h3>
            <p className="text-gray-600">Enable or disable all food items globally</p>
            {settingsData.isSuccess && (
              <p className="text-gray-600 text-sm">{settingsData.data.food_count || 0} items</p>
            )}
          </div>
          <button
            onClick={() => setAllDisabled(!allDisabled)}
            className="flex items-center space-x-2"
          >
            {!allDisabled ? (
              <ToggleRight className="w-8 h-8 text-green-500" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-gray-400" />
            )}
            <span className={!allDisabled ? 'text-green-600' : 'text-gray-500'}>
              {!allDisabled ? 'Enabled' : 'Disabled'}
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Food Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settingsData.isSuccess && disabledCategories?.map((food, index) => (
            <div className="p-4 border rounded-lg border-gray-300" key={index}> 
              <div className="flex items-center justify-between">
                <span className="font-medium">{food.category}</span>
                <button
                  onClick={() => handleCategoryToggle(food.category)}
                  className="flex items-center space-x-2"
                >
                  {!food.allFoodsDisabled ? (
                    <ToggleRight className="w-8 h-8 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                  <span className={!food.allFoodsDisabled ? 'text-green-600' : 'text-gray-500'}>
                    {!food.allFoodsDisabled ? 'Enabled' : 'Disabled'}
                  </span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">{food.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6 border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Global Price Adjustment</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjust all food prices
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={priceDetails.price}
                onChange={(e) => setPriceDetails(prev => ({
                  ...prev,
                  price: e.target.value
                }))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
              <select 
                className="text-gray-600 px-3 py-2 border border-gray-300 rounded-lg"
                value={priceDetails.type}
                onChange={(e) => setPriceDetails(prev => ({
                  ...prev,
                  type: e.target.value
                }))}
              >
                <option value="per">%</option>
                <option value="rup">₹</option>
              </select>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => confirmAction('changes-price')}
                disabled={updatePrice.isPending}
              >
                {updatePrice.isPending ? (
                  <svg viewBox="25 25 50 50" className='svg_loading'>
                    <circle r="20" cy="50" cx="50" className='circle_loading stroke-white' />
                  </svg>
                ) : (
                  "Apply Changes"
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Positive values increase prices, negative values decrease prices
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6 border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Order Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
            <div>
              <div className="font-medium text-red-800">Delete Unchecked Orders</div>
              <div className="text-sm text-red-600">Remove all orders that haven't been checked out</div>
            </div>
            <button
              onClick={() => confirmAction('delete-orders')}
              className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center space-x-2 ${
                settingsData.isSuccess && settingsData.data.uncheck_order_count === 0 
                  ? "bg-red-300" 
                  : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={(settingsData.isSuccess && settingsData.data.uncheck_order_count === 0) || deleteUncheckOrders.isPending}
            >
              <Trash2 className="w-4 h-4" />
              <span>
                {deleteUncheckOrders.isPending ? (
                  <svg viewBox="25 25 50 50" className='svg_loading'>
                    <circle r="20" cy="50" cx="50" className='circle_loading stroke-white' />
                  </svg>
                ) : (
                  "Delete Orders"
                )}
              </span>
            </button>
          </div>
          {settingsData.isSuccess && (
            <div className="text-sm text-gray-500 mt-2">
              {settingsData.data.uncheck_order_count} unchecked orders found
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      {renderImageSection(
        'banner', 
        'Banner Management', 
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />, 
        null, 
        stagedBnrImages, 
        homeBnrImages, 
        'blue'
      )}
      
      {renderImageSection(
        'certificate', 
        'Certificates', 
        <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />, 
        null, 
        stagedCrtImages, 
        homeCrtImages, 
        'green'
      )}
      
      {renderImageSection(
        'special', 
        'Special Foods (Homepage)', 
        <Star className="w-8 h-8 text-gray-400 mx-auto mb-2" />, 
        null, 
        stagedSpcImages, 
        homeSpcImages, 
        'purple'
      )}
    </div>
  );

  const renderSystem = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6 border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Database Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <div className="font-medium text-green-800">Export Data</div>
              <div className="text-sm text-green-600">Export data to Excel file</div>
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
              onClick={() => router.push("../admin/download_summary")}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export to Excel</span>
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
            <div>
              <div className="font-medium text-red-800">Reset All Data</div>
              <div className="text-sm text-red-600">Permanently delete all data in the database</div>
            </div>
            <button
              onClick={() => confirmAction('reset-database')}
              className="px-4 py-2 bg-red-300 text-white rounded-lg cursor-not-allowed flex items-center space-x-2"
              disabled
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Database</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    homeSpcImages.refetch();
    homeCrtImages.refetch();
    homeBnrImages.refetch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {renderConfirmDialog()}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Food Management Section */}
        <div className='mb-8'>
          <div className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100`}>
            <div className='flex items-center space-x-3'>
              <Utensils className="w-5 h-5" />
              <span className="font-medium">Food Management</span>
            </div>
            <button 
              className='text-sm bg-blue-400 hover:bg-blue-500 text-white flex items-center rounded-md px-4 space-x-2 font-semibold py-1.5'
              onClick={() => confirmAction('disable-foods')}
              disabled={updateAvailability.isPending}
            >
              <Save className='w-5 h-5'/>
              {updateAvailability.isPending ? (
                <svg viewBox="25 25 50 50" className='svg_loading'>
                  <circle r="20" cy="50" cx="50" className='circle_loading stroke-white' />
                </svg>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
          <hr className='opacity-30' />
          <div className='my-2'>
            {renderFoodManagement()}
          </div>
        </div>

        {/* Pricing Section */}
        <div className='mb-8'>
          <div className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100`}>
            <DollarSign className="w-5 h-5" />
            <span className="font-medium">Pricing</span>
          </div>
          <hr className='opacity-30' />
          <div className='my-2'>
            {renderPricing()}
          </div>
        </div>

        {/* Orders Section */}
        <div className='mb-8'>
          <div className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100`}>
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">Orders</span>
          </div>
          <hr className='opacity-30' />
          <div className='my-2'>
            {renderOrders()}
          </div>
        </div>

        {/* Content & Media Section */}
        <div className='mb-8'>
          <div className={`w-full flex justify-between px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100`}>
            <div className='flex items-center space-x-3'>
              <Image className="w-5 h-5" />
              <span className="font-medium">Content & Media</span>
            </div>
          </div>
          <hr className='opacity-30' />
          <div className='my-2'>
            {renderContent()}
          </div>
        </div>

        {/* System Section */}
        <div className='mb-8'>
          <div className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100`}>
            <Database className="w-5 h-5" />
            <span className="font-medium">System</span>
          </div>
          <hr className='opacity-30' />
          <div className='my-2'>
            {renderSystem()}
          </div>
        </div>
      </div>
      
      {/* Notification Component */}
      {notification.visible && (
        <NotificationLoader 
          state={notification.state} 
          information={notification.information} 
          close={hideNotification}
        />
      )}
    </div>
  );
}