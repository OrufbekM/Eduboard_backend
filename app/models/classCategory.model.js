module.exports = (sequelize, DataTypes) => {
  const ClassCategory = sequelize.define(
    "ClassCategory",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name",
      },
    },
    {
      tableName: "class_categories",
      timestamps: true,
    }
  );

  ClassCategory.associate = function(models) {
    ClassCategory.hasMany(models.Class, {
      foreignKey: 'category_id',
      as: 'classes'
    });
  };

  return ClassCategory;
};
