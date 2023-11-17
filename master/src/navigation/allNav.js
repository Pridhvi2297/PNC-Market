import {
    AiFillDashboard,
    AiOutlinePlus,
  } from 'react-icons/ai';
  import { BiCategory, BiLoaderCircle } from 'react-icons/bi';
  import { FiUsers } from 'react-icons/fi';
  import { CiChat1 } from 'react-icons/ci';
  import { GiShoppingCart } from "react-icons/gi";
  import { BsCurrencyDollar, BsChat } from 'react-icons/bs';
  import { RiProductHuntLine } from 'react-icons/ri';
  
  const roleIcons = {
    admin: {
      dashboard: <AiFillDashboard />,
      orders: <GiShoppingCart size={20} />,
      category: <BiCategory />,
      sellers: <FiUsers />,
      paymentRequest: <BsCurrencyDollar />,
      deactiveSellers: <FiUsers />,
      sellersRequest: <BiLoaderCircle />,
      chatSeller: <CiChat1 />,
    },
    seller: {
      dashboard: <AiFillDashboard />,
      addProduct: <AiOutlinePlus />,
      allProduct: <RiProductHuntLine />,
      discountProduct: <RiProductHuntLine />,
      orders: <GiShoppingCart size={20} />,
      payments: <BsCurrencyDollar />,
      chatCustomer: <BsChat />,
      chatSupport: <CiChat1 />,
      profile: <FiUsers />,
    },
  };
  
  export const allNav = [
    { id: 1, title: 'Dashboard', role: 'admin', path: '/admin/dashboard' },
    { id: 2, title: 'Orders', role: 'admin', path: '/admin/dashboard/orders' },
    { id: 3, title: 'Category', role: 'admin', path: '/admin/dashboard/category' },
    { id: 4, title: 'Sellers', role: 'admin', path: '/admin/dashboard/sellers' },
    { id: 5, title: 'Payment request', role: 'admin', path: '/admin/dashboard/payment-request' },
    { id: 6, title: 'Deactive Sellers', role: 'admin', path: '/admin/dashboard/deactive-sellers' },
    { id: 7, title: 'Sellers Request', role: 'admin', path: '/admin/dashboard/sellers-request' },
    { id: 8, title: 'Chat Seller', role: 'admin', path: '/admin/dashboard/chat-sellers' },
    { id: 9, title: 'Dashboard', role: 'seller', path: '/seller/dashboard' },
    { id: 10, title: 'Add Product', role: 'seller', path: '/seller/dashboard/add-product' },
    { id: 11, title: 'All Product', role: 'seller', path: '/seller/dashboard/products' },
    { id: 12, title: 'Discount Product', role: 'seller', path: '/seller/dashboard/discount-products' },
    { id: 13, title: 'Orders', role: 'seller', path: '/seller/dashboard/orders' },
    { id: 14, title: 'Payments', role: 'seller', path: '/seller/dashboard/payments' },
    { id: 15, title: 'Chat Customer', role: 'seller', path: '/seller/dashboard/chat-customer' },
    { id: 16, title: 'Chat Support', role: 'seller', path: '/seller/dashboard/chat-support' },
    { id: 17, title: 'Profile', role: 'seller', path: '/seller/dashboard/profile' },
  ].map((item) => ({
    ...item,
    icon: roleIcons[item.role][item.title.toLowerCase()],
  }));
  