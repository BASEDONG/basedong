export const TF_ECOSYSTEM_ASSETS =
  "/assets/marketing/token-factory/images/ecosystem";

export type GpuVendor = {
  id: string;
  name: string;
  nameZh: string;
  /** Official light-background logo from vendor site (SVG preferred). */
  logo: string;
};

/**
 * Example mainstream GPU / accelerator marks for the ecosystem wall.
 * Copy positions the product as vendor-agnostic; logos are illustrative only.
 */
export const gpuVendors: GpuVendor[] = [
  {
    id: "nvidia",
    name: "NVIDIA",
    nameZh: "英伟达",
    logo: `${TF_ECOSYSTEM_ASSETS}/nvidia.svg`,
  },
  {
    id: "intel",
    name: "Intel",
    nameZh: "英特尔",
    logo: `${TF_ECOSYSTEM_ASSETS}/intel.svg`,
  },
  {
    id: "ascend",
    name: "Ascend",
    nameZh: "昇腾",
    logo: `${TF_ECOSYSTEM_ASSETS}/ascend.svg`,
  },
  {
    id: "metax",
    name: "MetaX",
    nameZh: "沐曦",
    logo: `${TF_ECOSYSTEM_ASSETS}/metax.svg`,
  },
  {
    id: "enflame",
    name: "Enflame",
    nameZh: "燧原",
    logo: `${TF_ECOSYSTEM_ASSETS}/enflame.svg`,
  },
];
