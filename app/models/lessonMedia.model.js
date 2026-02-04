module.exports = (sequelize, DataTypes) => {
  const LessonMedia = sequelize.define(
    "LessonMedia",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "lesson_id",
        references: {
          model: "lessons",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "type",
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "url",
      },
      storagePath: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "storage_path",
      },
      originalName: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "original_name",
      },
      size: {
        type: DataTypes.BIGINT,
        allowNull: true,
        field: "size",
      },
      mimeType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "mime_type",
      },
    },
    {
      tableName: "lesson_media",
      timestamps: true,
    }
  );

  LessonMedia.associate = function(models) {
    LessonMedia.belongsTo(models.Lesson, {
      foreignKey: "lessonId",
      as: "lesson",
    });
    LessonMedia.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return LessonMedia;
};
