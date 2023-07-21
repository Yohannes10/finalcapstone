// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import avatar from "./assets/profile.png";
// import toast, { Toaster } from "react-hot-toast";
// import { useFormik } from "formik";
// import { passwordValidate } from "./helper/validate";
// import { useAuthStore } from "./store/store";
// import { verifyPassword } from "./helper/helper";
// import styles from "./styles/Username.module.css";

// export default function Password() {
//   const navigate = useNavigate();
//   const username = useAuthStore((state) => state.username);
//   const [password, setPassword] = useState("");

//   const formik = useFormik({
//     initialValues: {
//       password: "admin@123",
//     },
//     validate: passwordValidate,
//     validateOnBlur: false,
//     validateOnChange: false,
//     onSubmit: async (values) => {
//       setPassword(values.password);
//       let loginPromise = verifyPassword({ username, password: values.password });

//       toast.promise(loginPromise, {
//         loading: "Checking...",
//         success: <b>Login Successfully...!</b>,
//         error: <b>Password Not Match!</b>,
//       });

//       loginPromise.then((res) => {
//         let { token } = res.data;
//         localStorage.setItem("token", token);
//         navigate("/profile");
//       });
//     },
//   });

//   return (
//     <div className="container mx-auto">
//       <Toaster position="top-center" reverseOrder={false} />

//       <div className="flex justify-center items-center h-screen">
//         <div className={styles.glass}>
//           <div className="title flex flex-col items-center">
//             <h4 className="text-5xl font-bold">
//               Hello {username?.firstName || username?.username}
//             </h4>
//             <span className="py-4 text-xl w-2/3 text-center text-gray-500">
//               Explore More by connecting with us.
//             </span>
//           </div>

//           <form className="py-1" onSubmit={formik.handleSubmit}>
//             <div className="profile flex justify-center py-4">
//               <img
//                 src={avatar}
//                 className={styles.profile_img}
//                 alt="avatar"
//               />
//             </div>

//             <div className="textbox flex flex-col items-center gap-6">
//               <input
//                 {...formik.getFieldProps("password")}
//                 className={styles.textbox}
//                 type="password"
//                 placeholder="Password"
//               />
//               <button className={styles.btn} type="submit">
//                 Sign In
//               </button>
//             </div>

//             <div className="text-center py-4">
//               <span className="text-gray-500">
//                 Forgot Password?{" "}
//                 <Link className="text-red-500" to="/recovery">
//                   Recover Now
//                 </Link>
//               </span>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
