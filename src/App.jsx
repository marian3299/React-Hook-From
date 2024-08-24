import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({ 
    defaultValues: {
      name: "Mariana",
      email: "mariana@gmail.com"
    } 
  });

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    alert("Enviando datos...");

    reset();
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Name */}
      <label htmlFor="nombre">Name</label>
      <input
        type="text"
        {...register("name", {
          required: {
            value: true,
            message: "Name is required",
          },
          minLength: {
            value: 2,
            message: "Name must have at least 2 characters",
          },
          maxLength: {
            value: 20,
            message: "Name must have a maximum of 20 characters",
          },
        })}
      />
      {errors.name && <span>{errors.name.message}</span>}

      {/* Email */}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        {...register("email", {
          required: {
            value: true,
            message: "Email is required",
          },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email not valid",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      {/* Password */}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
          minLength: {
            value: 6,
            message: "Password must have at least 6 characters",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      {/* Confirm password */}
      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        type="password"
        {...register("confirmPassword", {
          required: {
            value: true,
            message: "Confirm password is required",
          },
          validate: (value) =>
            value === watch("password") ? true : "Passwords do not match",
        })}
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

      {/* Birth date */}
      <label htmlFor="birthDate">Birth date</label>
      <input
        type="date"
        {...register("birthDate", {
          required: {
            value: true,
            message: "Birth date is required",
          },
          validate: (value) => {
            const birthDate = new Date(value);
            const actualDate = new Date();
            const age = actualDate.getFullYear() - birthDate.getFullYear();

            return age >= 18 ? true : "You must be of legal age";
          },
        })}
      />
      {errors.birthDate && <span>{errors.birthDate.message}</span>}

      {/* Country */}
      <label htmlFor="country">Countryt</label>
      <select {...register("country")}>
        <option value="mx">Mexico</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>
      {watch("country") === "ar" && (
        <>
          <input
            type="text"
            placeholder="Province"
            {...register("province", {
              required: {
                value: true,
                message: "Province is required",
              },
            })}
          />
          {errors.province && <span>{errors.province.message}</span>}
        </>
      )}

      {/* Profile pictura */}
      <label htmlFor="file">Profile picture</label>
      <input
        type="file"
        {...register("file")}
        onChange={(e) => {
          console.log(e.target.files[0]);
          setValue("userPicture", e.target.files[0].name);
        }}
      />

      {/* Terms and conditions */}
      <label htmlFor="terms">Accept terms and conditions</label>
      <input
        type="checkbox"
        {...register("terms", {
          required: {
            value: true,
            message: "Accept terms and conditions",
          },
        })}
      />
      {errors.terms && <span>{errors.terms.message}</span>}

      <button>Enviar</button>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
}
