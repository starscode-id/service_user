module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      role: {
        type: DataType.ENUM,
        values: ["admin", "student"],
        allowNull: false,
        defaultValues: "student",
      },
      avatar: {
        type: DataType.STRING,
        allowNull: true,
      },
      profession: {
        type: DataType.STRING,
        allowNull: true,
      },
      createdAt: {
        field: "created_at",
        type: DataType.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: DataType.DATE,
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
  return User;
};
