export const TileKey = {
  EMPTY: "tile_empty",                // Viền ngoài không tương tác được
  HIDE: "tile_forbidden",             // Viền ngoài không tương tác được
  END: "tile_end",                    // Blue Box
  START: "tile_start",                // Red Box
  WALL: "tile_wall",                  // Tường ô cao
  ROAD: "tile_road",                  // Đường ô thấp
  TEL_IN: "tile_telin",               // Ô tele vào
  TEL_OUT: "tile_telout",             // Ô tele ra
  FLY_START: "tile_flystart",         // Ô bay
  FLOOR: "tile_floor",                // Ô sàn (không rõ)
  FENCE: "tile_fence",                // Ô bị bao xung quanh
  FENCE_BOUND: "tile_fence_bound",    // Ô rào bao quanh
  HEALING: "tile_healing",            // Ô hồi máu
  RCM_CREATE: "tile_rcm_crate",       // Ô khuyến khích đặt tường chặn
  RCM_OPERATOR: "tile_rcm_operator",  // Ô khuyến khích đặt tướng
  HOLE: "tile_hole",                  // Ô hố
  GAZEBO: "tile_gazebo",              // Ô buff ô cao
  BIG_FORCE: "tile_bigforce",         // Ô lực lớn (ví dụ)
  GRASS: "tile_grass",                // Ô cỏ
  INFECTION: "tile_infection",        // Ô nhiễm
  VOLCANO: "tile_volcano",            // Ô núi lửa
  DEF_UP: "tile_defuptile",           // Ô tăng phòng thủ
  TOXIC_HILL: "tile_toxichill",       // Ô đồi độc
  TOXIC: "tile_toxic",                // Ô độc
  TOXIC_ROAD: "tile_toxicroad",       // Đường độc
  TOXIC_WALL: "tile_toxicwall",       // Tường độc
};
export const TileKeyList = Object.values(TileKey);

export const getTileColorClass = (tileKey) => {
  switch (tileKey) {
    case "tile_empty":
    case "tile_forbidden":
      return "bg-white text-gray-300";
    case "tile_end":
      return "bg-blue-500 text-white";
    case "tile_start":
      return "bg-red-500 text-white";
    case "tile_wall":
    case "tile_fence":
    case "tile_fence_bound":
    case "tile_toxicwall":
      return "bg-gray-800 text-white";
    case "tile_road":
    case "tile_toxicroad":
      return "bg-gray-400 text-black";
    case "tile_healing":
      return "bg-green-300 text-black";
    case "tile_hole":
      return "bg-black text-white";
    case "tile_gazebo":
    case "tile_rcm_crate":
    case "tile_rcm_operator":
      return "bg-yellow-400 text-black";
    case "tile_infection":
    case "tile_toxic":
    case "tile_toxichill":
      return "bg-purple-600 text-white";
    case "tile_grass":
      return "bg-green-600 text-white";
    case "tile_floor":
      return "bg-gray-200";
    case "tile_telin":
    case "tile_telout":
      return "bg-cyan-400 text-black";
    case "tile_bigforce":
      return "bg-orange-500 text-white";
    case "tile_volcano":
      return "bg-red-700 text-white";
    case "tile_defuptile":
      return "bg-blue-200 text-black";
    default:
      return "bg-gray-100 text-black"; // fallback
  }
};