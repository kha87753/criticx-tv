class VodCategoryModel {
  final String categoryId;
  final String categoryName;
  final int parentId;

  const VodCategoryModel({
    required this.categoryId,
    required this.categoryName,
    required this.parentId,
  });

  factory VodCategoryModel.fromJson(Map<String, dynamic> json) {
    return VodCategoryModel(
      categoryId: json['category_id']?.toString() ?? '',
      categoryName: json['category_name']?.toString() ?? '',
      parentId: int.tryParse(json['parent_id']?.toString() ?? '0') ?? 0,
    );
  }
}