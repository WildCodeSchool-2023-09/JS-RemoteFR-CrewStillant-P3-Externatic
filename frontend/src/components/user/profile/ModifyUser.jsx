/* eslint-disable react/jsx-props-no-spreading */
import { React, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import PropTypes from "prop-types";
import hide from "../../../assets/images/hide.png";
import show from "../../../assets/images/show.png";
import success from "../../../assets/images/success.png";
import style from "../../inscriptionCandidat.module.scss";

function ModifyUser({ user, auth, setAuth, type, setType }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const passwordRef = useRef({});
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fileUrls, setFileUrls] = useState(null);

  // Handling Image Upload
  const uploader = Uploader({
    apiKey: "free",
  });

  const options = { multi: true };
  passwordRef.current = watch("password", "");

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  const onSubmit = async (data) => {
    try {
      const userResponse = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        {
          email: data.email || user.email,
          password: data.password || user.password,
          contactNumber: data.contact_number || user.contact_number,
          smsNotificationActive: data.smsNotificationActive || false,
          emailNotificationActive: data.emailNotificationActive || false,
          image: data.image || user.image,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (user.type === "entreprise" && data.image) {
        axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/company`,
          {
            name: type.name,
            image: data.image,
            description: type.description,
            website: type.website,
            establishmentDate: formatDateString(type.establishmentDate),
          },
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        setType({ ...type, data });
      }

      if (userResponse.status === 200) {
        toast.success("Votre profil a bien été modifié.");
        if (data.email || data.password) {
          setTimeout(() => {
            setAuth(null);
            navigate("/connexion");
          }, 2000);
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleDelete = async () => {
    try {
      const userDelete = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (userDelete.status === 200) {
        toast.success("Votre profil a bien été supprimé.");
        setTimeout(() => {
          setAuth(null);
          navigate("/accueil");
        }, 2000);
      }
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className={`${style.signupCandidate}`}>
        <div className={`${style.signDiv}`}>
          <div>
            <p className={`${style.p}`}>E-mail:</p>
            <input
              className={`${style.input}`}
              type="email"
              placeholder="johndoe@gmail.com"
              autoComplete="true"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[.][a-z]+$/i,
                  message: "Champ email invalide",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email?.message}</span>
            )}

            <p className={`${style.p}`}>Password:</p>
            <div className={`${style.password}`}>
              <input
                className={`${style.input}`}
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="true"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Minimum 8 caractères",
                  },
                  maxLength: {
                    value: 16,
                    message: "Maximum 16 caractères",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password?.message}</span>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`${style.showPassword}`}
                >
                  {showPassword ? (
                    <img src={show} alt="show" />
                  ) : (
                    <img src={hide} alt="hide" />
                  )}
                </button>
              </div>
            </div>

            <p className={`${style.p}`}>Confirmez mot de passe :</p>
            <input
              className={`${style.input}`}
              type="password"
              name="confirmPassword"
              autoComplete="true"
              {...register("confirmPassword", {
                required: passwordRef.current
                  ? "Vous devez confirmer votre mot de passe"
                  : null,
                validate: (value) =>
                  value === passwordRef.current ||
                  "Les mots de passe ne correspondent pas",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword?.message}
              </span>
            )}

            <p className={`${style.p}`}>Numéro de téléphone :</p>
            <input
              className={`${style.input}`}
              type="text"
              placeholder="06........"
              autoComplete="true"
              {...register("contactNumber", {
                minLength: { value: 10, message: "Format invalide" },
              })}
            />
            {errors.contactNumber && (
              <span className="text-red-500">
                {errors.contactNumber?.message}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className={`${style.notification}`}>
        <div>
          <label htmlFor="smsNotification" id="smsNotification">
            Notifications SMS :
          </label>
          <input
            type="checkbox"
            id="smsNotification"
            {...register("smsNotificationActive", { valueAsBoolean: true })}
          />
        </div>

        <div>
          <label htmlFor="emailNotification" id="emailNotification">
            Notification E-mail :
          </label>
          <input
            type="checkbox"
            id="emailNotification"
            {...register("emailNotificationActive", { valueAsBoolean: true })}
          />
        </div>

        <UploadButton
          uploader={uploader}
          options={options}
          onComplete={(image) => {
            const urls = image.map((x) => x.fileUrl).join("\n");
            setValue("image", urls);
            setFileUrls(urls);
          }}
        >
          {({ onClick }) => (
            <button
              className={`${style.CandidateButton}`}
              type="button"
              onClick={onClick}
            >
              Modifier votre photo
            </button>
          )}
        </UploadButton>
        {fileUrls ? (
          <img
            src={success}
            alt="success"
            className={`${style.checkPicture}`}
          />
        ) : null}
        <div className={`${style.buttons}`}>
          <button className={`${style.CandidateButton}`} type="submit">
            Modifier votre profil
          </button>
          <button
            className={`${style.CandidateButton}`}
            type="button"
            onClick={handleDelete}
          >
            Supprimer votre profil
          </button>
        </div>
      </section>
    </form>
  );
}

ModifyUser.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    contactNumber: PropTypes.string.isRequired,
    smsNotificationActive: PropTypes.bool.isRequired,
    emailNotificationActive: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    contact_number: PropTypes.string.isRequired,
  }).isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  setAuth: PropTypes.func.isRequired,
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    establishmentDate: PropTypes.string.isRequired,
  }).isRequired,
  setType: PropTypes.func.isRequired,
};

export default ModifyUser;
