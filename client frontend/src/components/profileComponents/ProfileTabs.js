import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Toast from "./../LoadingError/Toast";
import Loading from "./../LoadingError/Loading";
import { toast } from "react-toastify";

import { userUpdate } from "../../Redux/slices/userSlice";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 3000,
  };

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user);
  const { loading, error, userInfo } = userDetails;

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const updateLoading = false;
  // const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    let newProfile = { token: userInfo.token };

    if (name !== userInfo.name) {
      newProfile.name = name;
      dispatch(userUpdate(newProfile));
      console.log(name)
      console.log(userInfo.name)
      toastId.current = toast.success("Perfil atualizado", Toastobjects);
    }

    if (password !== '') {

      if (password !== confirmPassword) {
        toastId.current = toast.error("As senhas não são iguais", Toastobjects);
      } else {
        newProfile.password = password;
        newProfile.confirmPassword = confirmPassword;
        dispatch(userUpdate(newProfile));
        if (!error) {
          console.log(error)
          toastId.current = toast.success("Perfil atualizado", Toastobjects);
        }
      }
    }
    console.log(newProfile);
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Nome</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail</label>
            <input
              className="form-control"
              type="email"
              value={email}
              required
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Senha</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirme a senha</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Atualizar perfil</button>
      </form>
    </>
  );
};

export default ProfileTabs;
