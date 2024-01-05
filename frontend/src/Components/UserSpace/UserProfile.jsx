function UserProfile() {
  return (
    <div className="profile-section">
      <div className="user-image">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAACUCAMAAAD79nauAAAAM1BMVEXk5ueutLfn6eqrsbTq7O3e4eLJzc+/xMbb3t+1ur3R1Na5vsGnrrG9wcTM0NKxt7qjqa6yBGD8AAAEkUlEQVR4nO2c2XaDIBBAYdjBJf//tUVtEqtNIjBm0OM9fehDH7iFGRYHGLu4uLi4uLi4uLi4OBkAwJgamX4/GrHNyvpOG9NGjOm8t+xYIgBWm+CEaMQd3gfTWZDUTduKVDr0XPAFg0jbsUNoSDDL5v/BHKA3wDSrPvjbITfNqo4NYH49jFY03FM39A1g288KY28YW2tngHfbHKJF39VpEQN6q0O0iAFO3eB/kGG7wqjR1hffsHkoPSxCdRbJDvVZqI1paWHRKuqGzzE5DnHGMNQNfwI6zyFaVJNpweY6xBFVy6wH+Q4R6tZPpE4Qi64INSxqpW9KOoJzX8GAUn2Zg3D0eTY/Mz0sNLmDdYUOsSuoM1R5R0SLjtjBZqyZVhBHBXQIDrwh3q5mLfyWCEfqULDgmNOQjiddONH9IjRlfirOr3cI1x4KpyM4vxGOp9Jl04OGbqqQLZID53RrWYmTm0bIJOCG5iDIgsJihUSUINtVeMTh1BGNJ4mwgn1gqCTefxI6iERAlGipJAp3138IRIF9SSxxZ5A4RU+QSWBmJ6oVoMz8KvEvVPMExpkTucQp1k54u1PKjy3yDPsJidcTdDs7xGUs4fcitNMOQXgai3fuROfAWNE3xxk95dfH7gxnsac4FUf6PkG1hJ0AlJUH8ZcisBjLceov2aDLHai/nqJ8xw6WWAJjU0GaX385QW0Hk6UJqoYqGyaL5gpBdX65JKEyeeXQUzf+l5IZr5oawJJqzBoy050T1MWyzIVgYyrIrjNUxvaourp9SN/kVecQgcQRJUx9DuOCNuUmS015aQb4fvOdIlfFYuM/QJltBwcxLdXqMOCbzxqC8qhsCyCN+DCmhJY1d8OIZMbxVyKCO32QK7Sq+89DCOHaTh1CgY1X4m2n2368jj01vxHjfewap4bXTDfjvTYjWntvj3YzfmL2RAE7pMCQp5YcRgPGn+mNhRD6MR6GsHChNdpbxeqOimnw2BgGMaAjy+w0RHeEBxPDY3wEg7rFSwCU8p1p++bD5f5BJv5NGLulJo9oEP//ga/++W9V4qShfSU5FyTzxvUJ7Z+J8ChiyftDgm/7LIO7CO+dVpSJKy6TCtr/FGmCJ9IA5sMNq0KlEfr7Bx/AbNcjFkUMj3kY/9Wd0vDeDq7CgBDGfy1ZgVTaoSuMGvxbGsC0wwjnVxrfOGGW259JyWT3Z4eA7TOQ5oi971Kg1Qa9pWn3y1Ngw1cchtDY7dN2t/mAD0FjlwAHlvJoEIKF8+jxLRXaDc2tFlwjW0ikwqY0DdyqZZy74+kWqM8OYRaFp1ng5VqEciBqC9TifCIL1CuBGRYOIS4kTUzPLMqrHIsLgRAs2kILsNQKfJgvyizU3puHbZQ9KoZ59Skf0ReUOhJN1GtEmy9R+v4UHiJ7QKVWa+xJ7p0j+M5edCOZNywwrz2V02SdHhAvN9ZkOICqzEFkbPRQb8ei4JLXs/D1PfVnktOspNsIvSL9ddmc6srdSUxQ4KuZrJ+I1FLg2vLrgEgM7bw3kfcmreyuir3QmsSnQKtaNj0JKflJVTfTTby43vkD6OQ91p9+GtoAAAAASUVORK5CYII="
          alt="candidate"
          className="profile-pic"
        />
        <button type="button" className="button-space">
          Changer votre photo
        </button>
      </div>
      <div className="user-info">
        <p> Nom: </p>
        <p> Prénom: </p>
        <p> E-mail: </p>
        <p> Date de naissance: </p>
        <p> Date d'inscription: </p>
        <p> Ville: </p>
        <p> Pays: </p>
        <hr />
        <button type="button" className="button-space">
          Modifier votre CV
        </button>
        <button type="button" className="button-space">
          Supprimer votre CV
        </button>
        <button type="button" className="button-space">
          Modifier vos informations
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
