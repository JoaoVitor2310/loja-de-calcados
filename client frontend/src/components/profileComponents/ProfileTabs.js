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
  const { loading, error, userInfo, success } = userDetails;

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }

        if (success) {
          toastId.current = toast.success("Perfil atualizado", Toastobjects);
        }
  }, [dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    let newProfile = { token: userInfo.token };

    if (name !== userInfo.name) {
      newProfile.name = name;
      dispatch(userUpdate(newProfile));
    }

    if (password !== '' || confirmPassword !== '') {
        newProfile.password = password;
        newProfile.confirmPassword = confirmPassword;
        dispatch(userUpdate(newProfile));
    }
  };

  return (
    <>
      <Toast />
      {error &&   <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
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
