/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Modal from "react-modal";

// Initialisation de react-modal (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

export default function EditInfoModal({ type, isOpen, onClose, currentInfo }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lastname: currentInfo.name,
      firstname: currentInfo.firstname,
    },
  });
  const passwordRef = useRef({});
  passwordRef.current = watch("password", "");

  const onSubmit = () => {};

  return (
    <div>
      {type === "candidat" && (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
          <h2>Modifiez vos informations</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formGrid">
              <p>Nom:</p>
              <input
                type="text"
                placeholder="Doe"
                autoComplete="true"
                {...register("lastname", {
                  minLength: { value: 3, message: "Ce champ est obligatoire" },
                })}
              />
              {errors.lastname && (
                <span className="text-red-500">{errors.lastname?.message}</span>
              )}
            </div>

            <div className="formGrid">
              <p>Prénom:</p>
              <input
                type="text"
                placeholder="John"
                autoComplete="true"
                {...register("firstname", {
                  minLength: { value: 3, message: "Ce champ est obligatoire" },
                })}
              />
              {errors.firstname && (
                <span className="text-red-500">
                  {errors.firstname?.message}
                </span>
              )}
            </div>

            <div className="formGrid">
              <p>E-mail:</p>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                autoComplete="true"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[.][a-z]+$/i,
                    message: "Champ email invalide",
                  },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email?.message}</span>
              )}
            </div>

            <div className="formGrid">
              <p>Password:</p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="true"
                {...register("password", {
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/i,
                    message: "Doit contenir au minimum 8 - 16 caractères",
                  },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password?.message}</span>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "😀" : "😎"}
              </button>
            </div>
            <div>
              <p>Confirmez mot de passe :</p>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="true"
                {...register("confirmPassword", {
                  required: "Vous devez confirmer votre mot de passe",
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
            </div>

            <div className="formGrid">
              <p>Date de Naissance:</p>
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "Ce champs est obligatoire",
                  pattern: {
                    value:
                      /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                    message:
                      "Vous devez renseigner une date dans le bon format, ex: AAAA/MM/JJ",
                  },
                })}
              />
              {errors.dateOfBirth && (
                <span className="text-red-500">
                  {errors.dateOfBirth?.message}
                </span>
              )}
            </div>

            <div className="formGrid">
              <p>Salaire annuel souhaité :</p>
              <input
                type="number"
                placeholder="50000"
                autoComplete="true"
                {...register("salary", {
                  minLength: {
                    value: 1,
                    message: "Vous devez rentrer une valeur",
                  },
                  required: "Ce champs est obligatoire",
                })}
              />
              {errors.salary && (
                <span className="text-red-500">{errors.salary?.message}</span>
              )}
            </div>

            <div className="formGrid">
              <p>Numéro de téléphone :</p>
              <input
                type="text"
                placeholder="0123456789"
                autoComplete="true"
                {...register("contactNumber", {
                  minLength: { value: 10, message: "Format invalide" },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.contactNumber && (
                <span className="text-red-500">
                  {errors.contactNumber?.message}
                </span>
              )}
            </div>

            <label
              htmlFor="smsNotification"
              id="smsNotification"
              className="smsNotification"
            >
              Notifications SMS
            </label>
            <input
              type="checkbox"
              id="smsNotification"
              className="smsNotification"
              {...register("smsNotificationActive")}
            />

            <label
              htmlFor="emailNotification"
              id="emailNotification"
              className="emailNotification"
            >
              Notifications par e-mail
            </label>
            <input
              type="checkbox"
              id="emailNotification"
              className="emailNotification"
              {...register("emailNotificationActive")}
            />
            <button type="submit">Envoyer</button>
          </form>
        </Modal>
      )}
      {type === "entreprise" && (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
          <h2>Modifiez vos informations</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>Nom:</p>
              <input
                type="text"
                placeholder="Toto SARL"
                autoComplete="true"
                {...register("name", {
                  minLength: { value: 2, message: "Au moins 2 caractères" },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name?.message}</span>
              )}
            </div>

            <div>
              <p>E-mail:</p>
              <input
                type="email"
                placeholder="toto@gmail.com"
                autoComplete="true"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9_.]+[@]{1}[a-z0-9]+[.][a-z]+$/i,
                    message: "E-mail invalide",
                  },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email?.message}</span>
              )}
            </div>

            <div>
              <p>Mot de passe :</p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="true"
                {...register("password", {
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
                  },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password?.message}</span>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "😀" : "😎"}
              </button>
            </div>

            <div>
              <p>Confirmez mot de passe :</p>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="true"
                {...register("confirmPassword", {
                  required: "Vous devez confirmer votre mot de passe",
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
            </div>

            <div>
              <p>Site internet :</p>
              <input
                type="text"
                placeholder="www.toto.com"
                {...register("website", {
                  minLength: { value: 5, message: "Au moins 5 caractères" },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.website && (
                <span className="text-red-500">{errors.website?.message}</span>
              )}
            </div>

            <div>
              <p>Numéro de téléphone :</p>
              <input
                type="text"
                placeholder="0123456789"
                autoComplete="true"
                {...register("contactNumber", {
                  minLength: { value: 10, message: "Format invalide" },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.contactNumber && (
                <span className="text-red-500">
                  {errors.contactNumber?.message}
                </span>
              )}
            </div>

            <div>
              <p>Pays :</p>
              <input
                type="text"
                placeholder="Pays"
                autoComplete="true"
                {...register("country", {
                  pattern: {
                    value: /France/gi,
                    message:
                      "Vous devez impérativement être localiser en France",
                  },
                  required: "Ce champ est obligatoire",
                })}
              />
              {errors.country && (
                <span className="text-red-500">{errors.country?.message}</span>
              )}
            </div>

            <div>
              <p>N° SIRET :</p>
              <input
                type="text"
                placeholder="N° SIRET"
                {...register("siret", {
                  pattern: {
                    value: /[0-9]{14}/,
                    message: "Veuillez rentrer un numéro SIRET en 14 chiffres",
                  },
                })}
              />
              {errors.siret && (
                <span className="text-red-500">{errors.siret?.message}</span>
              )}
            </div>

            <div className="formGrid">
              <p>Date de Création:</p>
              <input
                type="date"
                {...register("establishmentDate", {
                  required: "Ce champs est obligatoire",
                  pattern: {
                    value:
                      /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                    message:
                      "Veuillez renseigner une date au bon format, ex: AAAA/MM/JJ",
                  },
                })}
              />
              {errors.establishmentDate && (
                <span className="text-red-500">
                  {errors.establishmentDate?.message}
                </span>
              )}
            </div>

            <div>
              <p>Secteur d'activité :</p>
              <input
                type="text"
                placeholder="Secteur"
                {...register("sector", {
                  minLength: { value: 3, message: "Au moins 3 caractères" },
                  required: "Ce champs est obligatoire",
                })}
              />
              {errors.sector && (
                <span className="text-red-500">{errors.sector?.message}</span>
              )}
            </div>

            <div>
              <p>Description:</p>
              <textarea
                type="text"
                placeholder="Entrez une description"
                {...register("description", {
                  minLength: { value: 100, message: "Au moins 100 caractères" },
                  required: "Ce champs est obligatoire",
                })}
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description?.message}
                </span>
              )}
            </div>

            <label
              htmlFor="smsNotification"
              id="smsNotification"
              className="smsNotification"
            >
              SMS Notification
            </label>
            <input
              type="checkbox"
              id="smsNotification"
              className="smsNotification"
              {...register("smsNotificationActive")}
            />

            <label
              htmlFor="emailNotification"
              id="emailNotification"
              className="emailNotification"
            >
              E-mail Notification
            </label>
            <input
              type="checkbox"
              id="emailNotification"
              className="emailNotification"
              {...register("emailNotificationActive")}
            />
            <button type="submit">Envoyez</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

EditInfoModal.propTypes = {
  type: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // onSave: PropTypes.func.isRequired,
  currentInfo: PropTypes.shape.isRequired,
};
