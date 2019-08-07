export default{
  schemaOptions: {
    toJSON: { virtuals: true }, toObject:
      {
        virtuals: true, transform: (doc, ret) => {
          delete ret._id;
        },
      },
    timestamps: true,
  },
};
