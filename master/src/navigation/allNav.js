import {
  FcAddDatabase,
  FcStatistics,
  FcCurrencyExchange,
  FcPaid,
  FcCloseUpMode,
  FcBriefcase,
  FcCustomerSupport,
  FcCollaboration,
  FcBusinessContact,
  FcDataSheet,
  FcNightPortrait,
  FcManager,
  FcGoodDecision,
} from "react-icons/fc";

export const allNav = [
  createNavItem(
    1,
    "Dashboard",
    <FcStatistics size={30} color="yellow" />,
    "admin",
    "/admin/dashboard"
  ),
  createNavItem(
    2,
    "Orders",
    <FcBriefcase size={30} color="yellow" />,
    "admin",
    "/admin/dashboard/orders"
  ),
  createNavItem(
    3,
    "Category",
    <FcDataSheet size={30} color="yellow" />,
    "admin",
    "/admin/dashboard/category"
  ),
  createNavItem(
    4,
    "Sellers",
    <FcManager size={30} color="yellow" />,
    "admin",
    "/admin/dashboard/sellers"
  ),
  createNavItem(
    5,
    "Payment request",
    <FcCurrencyExchange size={30} color="yellow" />,
    "admin",
    "/admin/dashboard/payment-request"
  ),
  createNavItem(
    6,
    "Deactive Sellers",
    <FcNightPortrait size={30} color="yellow" />,
    "admin",
    "/admin/dashboard/deactive-sellers"
  ),
  createNavItem(
    7,
    "Sellers Request",
    <FcGoodDecision size={30} color="yellow" />,
    "admin",
    "/admin/dashboard/sellers-request"
  ),
  createNavItem(
    8,
    "Chat Seller",
    <FcCollaboration size={30} color="yellow" />,
    "admin",
    "/admin/dashboard/chat-sellers"
  ),
  createNavItem(
    9,
    "Dashboard",
    <FcStatistics size={30} color="yellow" />,
    "seller",
    "/seller/dashboard"
  ),
  createNavItem(
    10,
    "Add Product",
    <FcAddDatabase size={30} color="yellow" />,
    "seller",
    "/seller/dashboard/add-product"
  ),
  createNavItem(
    11,
    "All Product",
    <FcPaid size={30} color="yellow" />,
    "seller",
    "/seller/dashboard/products"
  ),
  createNavItem(
    12,
    "Discount Product",
    <FcCloseUpMode size={30} color="yellow" />,
    "seller",
    "/seller/dashboard/discount-products"
  ),
  createNavItem(
    13,
    "Orders",
    <FcBriefcase size={30} color="yellow" />,
    "seller",
    "/seller/dashboard/orders"
  ),
  createNavItem(
    14,
    "Payments",
    <FcCurrencyExchange size={30} color="yellow" />,
    "seller",
    "/seller/dashboard/payments"
  ),
  createNavItem(
    15,
    "Chat Customer",
    <FcCollaboration size={30} color="yellow" />,
    "seller",
    "/seller/dashboard/chat-customer"
  ),
  createNavItem(
    16,
    "Chat Support",
    <FcCustomerSupport size={30} color="yellow" />,
    "seller",
    "/seller/dashboard/chat-support"
  ),
  createNavItem(
    17,
    "Profile",
    <FcBusinessContact size={30} color="yellow" />,
    "seller",
    "/seller/dashboard/profile"
  ),
];

function createNavItem(id, title, icon, role, path) {
  return { id, title, icon, role, path };
}
