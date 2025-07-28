"use client"

import React, { useState } from 'react';
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
  AlertTriangle ,
  FileSpreadsheet  ,
  X
} from 'lucide-react';
import { get_settings_data } from '@/reactQuery/settingsQuery';
import { useQuery , useMutation , useQueryClient} from '@tanstack/react-query';
import { 
  bulk_food_availability_update ,
  global_price_update,
  delete_all_unchecked_orders,
  upload_home_images ,
  get_home_images ,
  delete_home_images
} from '@/reactQuery/settingsQuery';
import { useEffect } from 'react';

export default function AdminSettings() {
  const [foodsEnabled, setFoodsEnabled] = useState(true);
  const [priceAdjustment, setPriceAdjustment] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);
  const [bannerFiles, setBannerFiles] = useState([]);
  const [certificateFiles, setCertificateFiles] = useState([]);
  const [specialFoodFiles, setSpecialFoodFiles] = useState([]);

  const [ all_disabled , set_all_disabled ] = useState(false) ;
  const [ disabled_cate , set_disabled_cate ] = useState([{}]) ;
  const [ price_details , set_price_details ] = useState({
    type : "per" ,
    price : 0 
  }) ;
  const [ stageed_spc_images , set_staged_spc_images ] = useState([]) ;
  const [ staged_crt_images , set_staged_crt_images ] = useState([]) ;
  const [ staged_bnr_images , set_staged_bnr_images ] = useState([]) ;

  const queryClient = useQueryClient() ;

  const settings_data = useQuery({
    queryKey : ['settings_data'] ,
    queryFn : get_settings_data
  })

  const home_spc_images = useQuery({
    queryKey : ['home_spc_images'] ,
    queryFn : () => get_home_images({folder : "specials"}),
    enabled : false 
  })
  const home_crt_images = useQuery({
    queryKey : ['home_crt_images'] ,
    queryFn : () => get_home_images({folder : "certificates"}),
    enabled : false 
  })
  const home_bnr_images = useQuery({
    queryKey : ['home_bnr_images'] ,
    queryFn : () => get_home_images({folder : "banners"}),
    enabled : false 
  })

  const update_availability = useMutation({
    mutationFn : bulk_food_availability_update ,
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ['settings_data'] });
    }
  })

  const delete_home_images_mutation = useMutation({
    mutationFn : delete_home_images ,
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ['home_spc_images'] });
      queryClient.invalidateQueries({ queryKey: ['home_crt_images'] });
      queryClient.invalidateQueries({ queryKey: ['home_bnr_images'] });
    }
  })

  const update_price = useMutation({
    mutationFn : global_price_update ,
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ['settings_data'] });
    }
  })

  const delete_uncheck_orders = useMutation({
    mutationFn : delete_all_unchecked_orders ,
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ['settings_data'] });
    }
  })

  const upload_images_mutation = useMutation({
    mutationFn : upload_home_images,
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ['home_spc_images'] });
      queryClient.invalidateQueries({ queryKey: ['home_crt_images'] });
      queryClient.invalidateQueries({ queryKey: ['home_bnr_images'] });
    }
  })

  useEffect( () => {
    if(settings_data.isSuccess)
    {
      set_all_disabled(settings_data.data.is_all_disabled) ;
      set_disabled_cate(settings_data.data.categories)
    }
  } , [settings_data.isSuccess] )

  useEffect( () => {
    const allAreFalse = disabled_cate.every(cat => cat.allFoodsDisabled === true ) ;
    if(allAreFalse)
    {
      set_all_disabled(true) ;
    }
  } , [disabled_cate])

  const handleSpcSelect = (e:any) => {
    const files = Array.from(e.target.files);

    const withPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    set_staged_spc_images((prev) => [...prev, ...withPreview]);
  }

  const handleCrtSelect = (e:any) => {
    const files = Array.from(e.target.files);

    const withPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    set_staged_crt_images((prev) => [...prev, ...withPreview]);
  }

  const handleBnrSelect = (e:any) => {
    const files = Array.from(e.target.files);

    const withPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    set_staged_bnr_images((prev) => [...prev, ...withPreview]);
  }

  const handleSpcRemove = (indexToRemove:any) => {
    set_staged_spc_images((prev) => {
      URL.revokeObjectURL(prev[indexToRemove].preview); // cleanup memory
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleCrtRemove = (indexToRemove:any) => {
    set_staged_crt_images((prev) => {
      URL.revokeObjectURL(prev[indexToRemove].preview); // cleanup memory
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleBnrRemove = (indexToRemove:any) => {
    set_staged_bnr_images((prev) => {
      URL.revokeObjectURL(prev[indexToRemove].preview); // cleanup memory
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleImagesRemoveOne = (public_id : any ) => {
    delete_home_images_mutation.mutate({public_id : public_id}) ;
  };

  const handleSpcUpload = async () => {
    const formData = new FormData();

    stageed_spc_images.forEach(({ file }) => {
      formData.append("images", file);
    });
    upload_images_mutation.mutate({ formData , folder: 'specials' })
  };

  const handleCrtUpload = async () => {
    const formData = new FormData();

    staged_crt_images.forEach(({ file }) => {
      formData.append("images", file);
    });
    upload_images_mutation.mutate({ formData , folder: 'certificates' })
  };

  const handleBnrUpload = async () => {
    const formData = new FormData();

    staged_bnr_images.forEach(({ file }) => {
      formData.append("images", file);
    });
    upload_images_mutation.mutate({ formData , folder: 'banners' })
  };

  const handleFileUpload = (type, files) => {
    const fileList = Array.from(files);
    switch(type) {
      case 'banner':
        setBannerFiles(prev => [...prev, ...fileList]);
        break;
      case 'certificate':
        setCertificateFiles(prev => [...prev, ...fileList]);
        break;
      case 'special':
        setSpecialFoodFiles(prev => [...prev, ...fileList]);
        break;
    }
  };

  const confirmAction = (action) => {
    setShowConfirmDialog(action);
  };

  const renderConfirmDialog = () => {
    if (!showConfirmDialog) return null;

    const actions = {
      'delete-orders': {
        title: 'Delete All Unchecked Orders',
        message: 'This will permanently delete all orders that haven\'t been checked out. This action cannot be undone.',
        danger: true,
        fn_action : () => {
          delete_uncheck_orders.mutate() ;
        }
      },
      'reset-database': {
        title: 'Reset All Database Data',
        message: 'This will permanently delete ALL data in the database , Please Export the data before reset. This action cannot be undone.',
        danger: true 
      },
      'changes-price': {
        title: 'Changes in Price',
        message: 'This will update price of all foods , Please Ensure the changes This won"t be reversible',
        danger: true,
        fn_action : () => {
          if( price_details.price == 0 )
          {
              return ;
          }
          update_price.mutate(price_details) ;
        }
      },
      'disable-foods': {
        title: 'Disbale Foods',
        message: 'This will disable the selected foods , Please Ensure the changes , This won"t be reversible',
        danger: true ,
        fn_action : () => {
          const final_data = {
            all_disabled : all_disabled ,
            disabled_cate : disabled_cate 
          } 
          update_availability.mutate(final_data) ;
        }
      },
    };

    const action = actions[showConfirmDialog];

    return (
      <div className="">
        <div className='fixed inset-0 bg-black opacity-30'
        onClick={() => setShowConfirmDialog(null)}
        ></div>
        <div className="fixed bg-white rounded-lg p-6 max-w-md w-mx z-50 inset-x-1/3 inset-y-50">
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
                action.fn_action() ;
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

  const renderFoodManagement = () => (
    <div className="space-y-6">

      <div className="bg-white rounded-lg shadow-sm border p-4 border-gray-300">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold">Food Availability</h3>
            <p className="text-gray-600">Enable or disable all food items globally</p>
            { settings_data.isSuccess && 
              <p className="text-gray-600 text-sm">{settings_data.data.food_count || 0 } items</p>
            }
          </div>
          <button
            onClick={() => set_all_disabled(!all_disabled)}
            className="flex items-center space-x-2"
          >
            { !all_disabled ? (
              <ToggleRight className="w-8 h-8 text-green-500" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-gray-400" />
            )}
            <span className={!all_disabled ? 'text-green-600' : 'text-gray-500'}>
              {!all_disabled ? 'Enabled' : 'Disabled'}
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Food Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          { 
            settings_data.isSuccess && 
            disabled_cate && 
            disabled_cate.map( ( food : any , index : any) => (
              <div className="p-4 border rounded-lg border-gray-300" key={index}> 
                <div className="flex items-center justify-between">
                  <span className="font-medium">{food.category}</span>
                  <button
                    onClick={() => set_disabled_cate(prev =>
                      prev.map(cat =>
                        cat.category === food.category
                          ? { ...cat, allFoodsDisabled: ! cat.allFoodsDisabled }
                          : cat
                      )
                    )}
                    className="flex items-center space-x-2"
                  >
                    { !food.allFoodsDisabled ? (
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
            ))
          }

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
              Adjust all food prices by percentage
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={price_details.price}
                onChange={(e) => set_price_details( prev => ({
                  ...prev ,
                  price : parseInt(e.target.value)
                }))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="0"
              />
              <select className="text-gray-600"
              value={price_details.type}
              onChange={(e) => set_price_details( prev => ({
                  ...prev ,
                  type : e.target.value
                }))}
              >
                <option value="per">%</option>
                <option value="rup">&#8377;</option>
              </select>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => confirmAction('changes-price')}
              >
                Apply Changes
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
              className={`px-4 py-2  text-white rounded-lg  transition-colors flex items-center space-x-2 ${settings_data.isSuccess &&  settings_data.data.uncheck_order_count == 0 ? "bg-red-300" : "bg-red-500 hover:bg-red-600" } `}
              disabled={ settings_data.isSuccess &&  settings_data.data.uncheck_order_count == 0 }
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Orders</span>
            </button>
          </div>
          {
            settings_data.isSuccess && 
            <div className="text-sm text-gray-500 mt-2">
              {settings_data.data.uncheck_order_count} Uncheckout orders found
            </div>
          }
        </div>
      </div>
    </div>
  );

  const renderContent = () => (

    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6 border-gray-300">

        <h3 className="text-lg font-semibold mb-4">Banner Management</h3>
        <div className="space-y-4">
          <div className='w-full'>
              
              <div className=''>
                  {
                    home_bnr_images.isSuccess && home_bnr_images.data.images.length > 0 &&
                    <>
                      <div className='font-semibold text-gray-500'>Live Certificates</div>
                      <div className='flex gap-4 flex-wrap mt-1'> 
                        {
                          home_bnr_images.data.images.map( (item:any , key : any ) => (
                            <div key={key} className="rounded-md h-[160px] relative w-[400px]">
                              <img
                                src={item.url}
                                alt={`preview-${key}`}
                                className="w-[400px] h-[160px] object-cover rounded-md"
                              />
                              <button className='absolute bg-red-500 text-white font-bold p-1.5 rounded-md top-1 right-1 hover:bg-red-600'
                              onClick={() => handleImagesRemoveOne(item.public_id)}
                              >
                                <Trash2 className="w-4 h-4" />{}
                              </button>
                            </div>
                          ))
                        }
                      </div>
                    </>
                  }
                  <div className=''>
                  {
                    staged_bnr_images.length > 0 && 
                    <>
                      <div className='font-semibold text-gray-500 mt-3'>Selected Certificates</div>
                      <div className='flex gap-4 flex-wrap mt-1'>
                        {(
                          staged_bnr_images.map((item, idx) => (
                            <div key={idx} className="rounded-md h-[160px] relative w-[400px]">
                              <img
                                src={item.preview}
                                alt={`preview-${idx}`}
                                className="w-[400px] h-[160px] object-cover rounded-md"
                              />
                              <button className='absolute bg-red-500 text-white font-bold p-1.5 rounded-md top-1 right-1 hover:bg-red-600'
                              onClick={() => handleBnrRemove(idx)}
                              >
                                <Trash2 className="w-4 h-4" />{}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  }
                </div>
            </div>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">Upload new banners</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleBnrSelect}
              className="hidden"
              id="banner-upload"
            />
            {staged_bnr_images.length > 0 && 
              <button className='bg-red-400 px-4 py-2 text-white rounded-lg mr-3'
              onClick={() => set_staged_bnr_images([])}
              >
               <X className=" text-white w-5 h-5 inline-flex" /> Cancel
              </button>
            }
            <label
              htmlFor="banner-upload"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer inline-block"
            >
              Choose Files
            </label>
            {staged_bnr_images.length > 0 && 
            <button className='bg-blue-400 px-4 py-2 text-white rounded-lg ml-3'
              onClick={() => {
                handleBnrUpload();
              }}
              > 
              <Upload className=" text-white w-5 h-5 inline-flex" /> Upload
             </button>
            }
          </div>
        </div>
      </div>


      <div className="bg-white rounded-lg shadow-sm border p-6 border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Certificates</h3>
        <div className="space-y-4">
          <div className='w-full'>
              <div className=''>
                  {
                    home_crt_images.isSuccess && home_crt_images.data.images.length > 0 &&
                    <>
                      <div className='font-semibold text-gray-500'>Live Certificates</div>
                      <div className='flex gap-4 flex-wrap mt-1'> 
                        {
                          home_crt_images.data.images.map( (item:any , key : any ) => (
                            <div key={key} className="rounded-md h-[100px] relative w-[200px]">
                              <img
                                src={item.url}
                                alt={`preview-${key}`}
                                className="w-[200px] h-[100px] object-cover rounded-md"
                              />
                              <button className='absolute bg-red-500 text-white font-bold p-1.5 rounded-md top-1 right-1 hover:bg-red-600'
                              onClick={() => handleImagesRemoveOne(item.public_id)}
                              >
                                <Trash2 className="w-4 h-4" />{}
                              </button>
                            </div>
                          ))
                        }
                      </div>
                    </>
                  }
                  <div className=''>
                  {
                    staged_crt_images.length > 0 && 
                    <>
                      <div className='font-semibold text-gray-500 mt-3'>Selected Certificates</div>
                      <div className='flex gap-4 flex-wrap mt-1'>
                        {(
                          staged_crt_images.map((item, idx) => (
                            <div key={idx} className="rounded-md h-[100px] relative w-[200px]">
                              <img
                                src={item.preview}
                                alt={`preview-${idx}`}
                                className="w-[200px] h-[100px] object-cover rounded-md"
                              />
                              <button className='absolute bg-red-500 text-white font-bold p-1.5 rounded-md top-1 right-1 hover:bg-red-600'
                              onClick={() => handleCrtRemove(idx)}
                              >
                                <Trash2 className="w-4 h-4" />{}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  }
                </div>
              </div>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Award className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">Upload certificates and awards</p>
            <input
              type="file"
              multiple
              accept="image/*,.pdf"
              onChange={handleCrtSelect}
              className="hidden"
              id="certificate-upload"
            />
            {staged_crt_images.length > 0 && 
              <button className='bg-red-400 px-4 py-2 text-white rounded-lg mr-3'
              onClick={() => set_staged_crt_images([])}
              >
               <X className=" text-white w-5 h-5 inline-flex" /> Cancel
              </button>
            }
            <label
              htmlFor="certificate-upload"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer inline-block"
            >
              Choose Files
            </label>
            {staged_crt_images.length > 0 && 
            <button className='bg-blue-400 px-4 py-2 text-white rounded-lg ml-3'
              onClick={() => {
                handleCrtUpload();
              }}
              > 
              <Upload className=" text-white w-5 h-5 inline-flex" /> Upload
             </button>
            }
          </div>
        </div>
      </div>


      <div className="bg-white rounded-lg shadow-sm border p-6 border-gray-300">
        <h3 className="text-lg font-semibold mb-4">Special Foods (Homepage)</h3>
        <div className="space-y-4">
            <div className='w-full'>
              <div className=''>
                  {
                    home_spc_images.isSuccess && home_spc_images.data.images.length > 0 &&
                    <>
                      <div className='font-semibold text-gray-500'>Live Foods</div>
                      <div className='flex gap-4 flex-wrap mt-1'> 
                        {
                          home_spc_images.data.images.map( (item:any , key : any ) => (
                            <div key={key} className="rounded-md h-[200px] relative w-[200px]">
                              <img
                                src={item.url}
                                alt={`preview-${key}`}
                                className="w-[200px] h-[200px] object-cover rounded-md"
                              />
                              <button className='absolute bg-red-500 text-white font-bold p-1.5 rounded-md top-1 right-1 hover:bg-red-600'
                              onClick={() => handleImagesRemoveOne(item.public_id)}
                              >
                                <Trash2 className="w-4 h-4" />{}
                              </button>
                            </div>
                          ))
                        }
                      </div>
                    </>
                  }
                  <div className=''>
                  {
                    stageed_spc_images.length > 0 && 
                    <>
                      <div className='font-semibold text-gray-500 mt-3'>Selected Foods</div>
                      <div className='flex gap-4 flex-wrap mt-1'>
                        {(
                          stageed_spc_images.map((item, idx) => (
                            <div key={idx} className="rounded-md h-[200px] relative w-[200px]">
                              <img
                                src={item.preview}
                                alt={`preview-${idx}`}
                                className="w-[200px] h-[200px] object-cover rounded-md"
                              />
                              <button className='absolute bg-red-500 text-white font-bold p-1.5 rounded-md top-1 right-1 hover:bg-red-600'
                              onClick={() => handleSpcRemove(idx)}
                              >
                                <Trash2 className="w-4 h-4" />{}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  }
                </div>
              </div>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Star className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 mb-2">Upload special food images for homepage</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleSpcSelect}
              id="special-upload"
              className="hidden"
            />
            {stageed_spc_images.length > 0 && 
              <button className='bg-red-400 px-4 py-2 text-white rounded-lg mr-3'
              onClick={() => set_staged_spc_images([])}
              >
               <X className=" text-white w-5 h-5 inline-flex" /> Cancel
              </button>
            }
            <label
              htmlFor="special-upload"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors cursor-pointer inline-block"
            >
              Choose Files
            </label>
            {stageed_spc_images.length > 0 && 
            <button className='bg-blue-400 px-4 py-2 text-white rounded-lg ml-3'
              onClick={() => {
                handleSpcUpload();
              }}
              > 
              <Upload className=" text-white w-5 h-5 inline-flex" /> Upload
             </button>
            }
          </div>
        </div>
      </div>
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
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
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
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Database</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderConfirmDialog()}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className=''>
            <div
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100`}
                  >
                    <div className='flex items-center space-x-3 '>
                      <Utensils className="w-5 h-5" />
                      <span className="font-medium">Food Management</span>
                    </div>
                    <button className='text-sm bg-blue-400 hover:bg-blue-500 text-white flex items-center rounded-md px-4 space-x-2 font-semibold py-1.5'
                    onClick={() =>{ 
                      const is_confirm = confirmAction('disable-foods') ;
                    }}
                    >
                      <Save className='w-5 h-5'/>
                      {
                        update_availability.isPending ? 
                        <svg viewBox="25 25 50 50" className='svg_loading'>
                            <circle r="20" cy="50" cx="50" className='circle_loading stroke-white' ></circle>
                        </svg>
                        :
                        <span>Save Changes</span>
                      }
                    </button>
            </div>
            <hr className='opacity-30'></hr>
            <div className='my-2'>
              {renderFoodManagement()}
            </div>
          </div>

          <div className=''>
            <div
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100`}
                  >
                    <DollarSign className="w-5 h-5" />
                    <span className="font-medium">Pricing</span>
            </div>
            <hr className='opacity-30'></hr>
            <div className='my-2'>
              {renderPricing()}
            </div>
          </div>

          <div className=''>
            <div
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-medium">Orders</span>
            </div>
            <hr className='opacity-30'></hr>
            <div className='my-2'>
              {renderOrders()}
            </div>
          </div>

          <div className=''>
            <div className={`w-full flex justify-between  px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100`}
                  >
                    <div className='flex items-center space-x-3'>
                      <Image className="w-5 h-5" />
                      <span className="font-medium">Content & Media</span>
                    </div>
                    
            </div>
            <hr className='opacity-30'></hr>
            <div className='my-2'>
              {renderContent()}
            </div>
          </div>

          <div className=''>
            <div
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-600 hover:bg-gray-100`}
                  >
                    <Database className="w-5 h-5" />
                    <span className="font-medium">System</span>
            </div>
            <hr className='opacity-30'></hr>
            <div className='my-2'>
              {renderSystem()}
            </div>
          </div>
      </div>

    </div>
  );
}