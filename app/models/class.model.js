module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "description",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "category_id",
        references: {
          model: "class_categories",
          key: "id",
        },
      },
    },
    {
      tableName: "classes",
      timestamps: true,
    }
  );

  Class.associate = function(models) {
    Class.belongsTo(models.ClassCategory, {
      foreignKey: 'categoryId',
      as: 'category'
    });
    Class.hasMany(models.Lesson, {
      foreignKey: 'classId',
      as: 'lessons'
    });
  };

  return Class;
};
