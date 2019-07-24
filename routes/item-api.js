const orderItem = require("../models/Item");
const express = require("express");
const router = express.Router();

require("dotenv").config();
const stripe = require("stripe")("sk_test_PAGemW3HJHwcvA0PLP6eme6F00nK93R7T3");

const data = [
  {
    name: "Vintage Teddies Stitchery Quilt",
    description:
      "Set of 10 Patterns. Nine gorgeous teddy stitcheries for you to stitch. Make into a quilt or use for any projects you wish. These would also look great with a wash of colour with Jo Sonja paints or coloured pencils. Finished size of quilt is 57” x 57”",
    categories: "bom quilts",
    sub_categories: "bom patterns only",
    price: 137.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798455/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Vintage%20Teddies%20Stitchery%20version%20quilt/full_quilt_vintage_teddies_stitchery_ujlmzj.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798467/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Vintage%20Teddies%20Stitchery%20version%20quilt/block_1_vintage_teddies_stitchery_hnqetr.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798422/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Vintage%20Teddies%20Stitchery%20version%20quilt/block_2_vintage_teddies_stitchery_iypabo.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798457/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Vintage%20Teddies%20Stitchery%20version%20quilt/block_3_vintage_teddies_stitchery_g4ej9t.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798429/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Vintage%20Teddies%20Stitchery%20version%20quilt/block_4_vintage_teddies_stitchery_lspetm.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798524/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Vintage%20Teddies%20Stitchery%20version%20quilt/block_5_vintage_teddies_stitchery_yjd9o4.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798443/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Vintage%20Teddies%20Stitchery%20version%20quilt/block_7_vintage_teddies_stitchery_qga3hk.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798502/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Vintage%20Teddies%20Stitchery%20version%20quilt/block_8_vintage_teddies_stitchery_hbq2j8.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798453/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Vintage%20Teddies%20Stitchery%20version%20quilt/block_9_vintage_teddies_stitchery_vuaiyo.jpg"
    ],

    auto_process: false,
    new: false,
    package_dimensions: {
      height: 2,
      length: 25,
      width: 16,
      weight: 0.25
    }
  },
  {
    name: "Libby’s Mystery Quilt",
    description:
      "Set of 10 Patterns. Nine adorable patterns combining applique and stitchery. Finished size of quilt is 65” x 65”",
    categories: "bom quilts",
    sub_categories: "bom patterns only",
    price: 140.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563840851/sub%20-%20catergies%20folders/Photo_s%20for%20main%20Catergories/stitcheries_-_main_cat_eaod6b.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 2.5,
      length: 25,
      width: 16,
      weight: 0.37
    }
  },
  {
    name: "Girls Day Out Quilt",
    description: "Set of 12 Patterns. Finished size of quilt is 57” x 66”",
    categories: "bom quilts",
    sub_categories: "bom patterns only",
    price: 140.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798417/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/full_quilt_-_block_12_mbqeoc.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798296/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_1_kt9wqb.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798335/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_2_ry5ep9.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798378/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_4_f1pblq.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798395/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_5_ium1qo.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798410/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_6_z0hyfj.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798428/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_7_zaelkj.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798366/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_8_nugag0.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798377/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_9_ewshfo.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798341/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_10_yc3se1.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798377/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_11_unvwbd.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798417/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/full_quilt_-_block_12_mbqeoc.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 2.5,
      length: 25,
      width: 16,
      weight: 0.38
    }
  },
  {
    name: "Sew Sweet Quilt",
    description:
      "Set of 5 Patterns. Five sweet teddy stitcheries for you to hand stitch. Make into a quilt or use for any projects you wish. These would also look lovely with a wash of colour with Jo Sonja paints or coloured pencils. Finished size of quilt is 57” x 57”",
    categories: "bom quilts",
    sub_categories: "bom patterns only",
    price: 75.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798477/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Sew%20Sweet/Full_quilt_-_Sew_Sweet_yepdzv.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798495/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Sew%20Sweet/block_2_-_Sew_Sweet_Quilt_x5kzjt.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798514/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Sew%20Sweet/block_3_-_Sew_Sweet_quilt_okg4wa.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798479/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Sew%20Sweet/Block_4_-_Sew_Sweet_quilt_zzxeq6.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 1.0,
      length: 25,
      width: 16,
      weight: 0.13
    }
  },
  {
    name: "Vintage Teddies Stitchery Quilt Kit",
    description:
      "Includes all fabrics for your quilt top and binding. Set of 10 Patterns. Nine gorgeous teddy stitcheries for you to stitch. These would also look great with a wash of colour with Jo Sonja paints or coloured pencils. Finished size of quilt is 57” x 57” ",
    categories: "bom quilts",
    sub_categories: "bom kits",
    price: 450.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798155/sub%20-%20catergies%20folders/Vintage%20Teddies%20Stitchery%20version%20quilt/full_quilt_block_10_-_s_jklbja.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798184/sub%20-%20catergies%20folders/Vintage%20Teddies%20Stitchery%20version%20quilt/block_1_-_s_ytd2pv.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798345/sub%20-%20catergies%20folders/Vintage%20Teddies%20Stitchery%20version%20quilt/block_-_s_ioj6tw.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798295/sub%20-%20catergies%20folders/Vintage%20Teddies%20Stitchery%20version%20quilt/block_4_-_s_vu16su.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798443/sub%20-%20catergies%20folders/Vintage%20Teddies%20Stitchery%20version%20quilt/block_5_-_s_wclkex.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798363/sub%20-%20catergies%20folders/Vintage%20Teddies%20Stitchery%20version%20quilt/block_6_-_s_hvlorq.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798443/sub%20-%20catergies%20folders/Vintage%20Teddies%20Stitchery%20version%20quilt/block_7_-_s_taxh8t.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563797991/sub%20-%20catergies%20folders/Vintage%20Teddies%20Stitchery%20version%20quilt/block_9_-_s_cqjir0.png"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 12,
      length: 31,
      width: 22,
      weight: 2.0
    }
  },
  {
    name: "Girls Day Out",
    description:
      "Set of 12 Patterns. Girls Day Out is a set of 12 patterns. Includes all fabrics for quilt top. All applique fabrics, lace and embellishments on lolly shop and binding. Button pack – optional $38.50.",
    categories: "new release",
    price: 450.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798417/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/full_quilt_-_block_12_mbqeoc.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798296/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_1_kt9wqb.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798335/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_2_ry5ep9.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798378/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_4_f1pblq.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798395/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_5_ium1qo.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798410/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_6_z0hyfj.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798428/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_7_zaelkj.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798366/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_8_nugag0.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798377/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_9_ewshfo.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798341/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_10_yc3se1.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798377/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/Gdo_block_11_unvwbd.jpg",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563798417/sub%20-%20catergies%20folders/BOM%20PATTERNS%20ONLY/Girls%20Day%20Out%20Quilt/full_quilt_-_block_12_mbqeoc.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 12,
      length: 35,
      width: 16,
      weight: 2.0
    }
  },
  {
    name: "Girls Day Out Button Set",
    description:
      "Set of 16 wooden buttons. Designed and hand painted for the Girls Day Out quilt. Includes all buttons as pictured.",
    categories: "buttons",
    price: 38.5,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563840852/sub%20-%20catergies%20folders/Buttons/Girls_Day_Out_button_set_iufe2s.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 1,
      length: 12,
      width: 15,
      weight: 0.05
    }
  },
  {
    name: "Ronald Reindeer table runner",
    description:
      "Applique and piecing. Is sure to put smiles on everyone's face this year. This pattern has been one of the most popular patterns I have sold. Finished size of table runner is 150cm x 38cm",
    categories: "christmas",
    price: 17.6,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563840852/sub%20-%20catergies%20folders/Photo_s%20for%20main%20Catergories/applique_-_main_cat_xubgyi.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 0.2,
      length: 25,
      width: 16,
      weight: 0.04
    }
  },
  {
    name: "Teddy Needle Case",
    description:
      "Cute little needle, thread and scissors case ~ quick and easy, ideal for your project bag. Finished size of case is 12cm x 16cm (folds out to 34cm).",
    categories: "stitchery patterns",
    sub_categories: "pattern only",
    price: 14.5,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563841977/sub%20-%20catergies%20folders/needle-case_puqxam.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 0.2,
      length: 25,
      width: 16,
      weight: 0.05
    }
  },
  {
    name: "Ollie & Olive Owl Quilt",
    description:
      "Great first baby quilt. Perfect size to pop in your nappy bag. Ollie and Olive owl are appliqued, using hand, machine or fusible applique. Great project to use up some scraps in your stash. Finished size of quilt is 36½” x 36½”",
    categories: "quilt sets",
    price: 15.5,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563840845/sub%20-%20catergies%20folders/Quilt%20sets%20-%20new%20photos/Ollie_and_Olive_qwl_quilt_susbmp.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 0.2,
      length: 25,
      width: 16,
      weight: 0.05
    }
  },
  {
    name: "Ollie & Olive Owl Bag",
    description:
      "Great size for a first baby/nappy bag. This baby bag is perfect for carrying all those baby essentials when out and about. Ollie and Olive owl are appliqued, using hand, machine or fusible applique. Great project to use up some scraps in your stash. Finished size of bag is 21” x 21”",
    Categories: "quilt sets",
    price: 15.5,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563840845/sub%20-%20catergies%20folders/Quilt%20sets%20-%20new%20photos/Ollie_and_Olive_bag_zsljg0.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 0.2,
      length: 25,
      width: 16,
      weight: 0.05
    }
  },
  {
    name: "Ollie & Olive Owl Stuffies",
    description:
      "Adorable stuffed Owls. Perfect for lots of hugs and cuddles. Great project to use up some scraps in your stash. Great gift to make and match Owl Quilt and Nappy bag. Finished size: three sizes included in pattern",
    Categories: "quilt sets",
    price: 15.5,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563840845/sub%20-%20catergies%20folders/Quilt%20sets%20-%20new%20photos/Ollie_and_Olive_Stuffies_dupikh.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 0.2,
      length: 25,
      width: 16,
      weight: 0.05
    }
  },
  {
    name: "Poppy Bear and Friend Kit",
    description:
      "Bear Hugs inspired by Shaz Bears. I had in mind when designing these that they could be sewn to any project eg needle cases, bags, thread keepers These are a great size to take and stitch between those bigger projects. Includes pattern, linen/cotton background fabric and all pieces and threads to finish pictured design. I will be adding new designs regularly to this range so you can also make a quilt. Finished size of applique & stitchery 18cm x 16cm",
    categories: "applique patterns",
    sub_categories: "bear hugs",
    price: 30.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563841969/sub%20-%20catergies%20folders/Bear%20Hugs/BH_01_-_Poppy_Bear_and_friend_zmlf5g.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 1,
      length: 25,
      width: 16,
      weight: 0.07
    }
  },
  {
    name: "Poppy Bear and Friend Pattern Only",
    description:
      "Pattern only. Bear Hugs inspired by Shaz Bears. I had in mind when designing these that they could be sewn to any project eg needle cases, bags, thread keepers These are a great size to take and stitch between those bigger projects. I will be adding new designs regularly to this range so you can also make a quilt. Finished size of applique & stitchery 18cm x 16cm",
    categories: "applique patterns",
    sub_categories: "bear hugs",
    price: 14.5,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563841969/sub%20-%20catergies%20folders/Bear%20Hugs/BH_01_-_Poppy_Bear_and_friend_zmlf5g.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 0.2,
      length: 25,
      width: 16,
      weight: 0.04
    }
  },
  {
    name: "Pookie and Jemma Kit",
    description:
      "Bear Hugs inspired by Shaz Bears. I had in mind when designing these that they could be sewn to any project eg needle cases, bags, thread keepers These are a great size to take and stitch between those bigger projects. Includes pattern, linen/cotton background fabric and all pieces and threads to finish pictured design. I will be adding new designs regularly to this range so you can also make a quilt. Finished size of applique & stitchery 18cm x 16cm",
    categories: "applique patterns",
    sub_categories: "bear hugs",
    price: 30.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563841968/sub%20-%20catergies%20folders/Bear%20Hugs/BH_02_-_Pookie___Jemma_goec60.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 1,
      length: 25,
      width: 16,
      weight: 0.07
    }
  },
  {
    name: "Pookie and Jemma Patten Only",
    description:
      "Pattern only. Bear Hugs inspired by Shaz Bears. I had in mind when designing these that they could be sewn to any project eg needle cases, bags, thread keepers These are a great size to take and stitch between those bigger projects. I will be adding new designs regularly to this range so you can also make a quilt. Finished size of applique & stitchery 18cm x 16cm",
    categories: "applique patterns",
    sub_categories: "bear hugs",
    price: 14.5,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563841968/sub%20-%20catergies%20folders/Bear%20Hugs/BH_02_-_Pookie___Jemma_goec60.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 0.2,
      length: 25,
      width: 16,
      weight: 0.04
    }
  },
  {
    name: "Vintage Teddies applique quilt embellishment pack",
    description:
      "Includes all lace, wool felt and embellishment buttons for each block. Does not include the assorted old buttons on the finished quilt top.",
    categories: "embellishment packs",
    price: 30.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563797232/sub%20-%20catergies%20folders/Embellishment%20packs/Vintage_Teddies_Embellishment_pack_for_Applique_quilt_vapucp.png"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 3,
      length: 25,
      width: 13,
      weight: 0.05
    }
  },
  {
    name: "Candice Bear",
    description:
      "Includes pattern, pre printed calico ready for you to colour with paints or pencils. Finished size of project is 33cm x 28cm",
    categories: "stitchery patterns",
    sub_categories: "pre-printed on calico",
    price: 17.5,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563840851/sub%20-%20catergies%20folders/Photo_s%20for%20main%20Catergories/Bear_Hugs_-_Whats_new_p49nbb.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 0.2,
      length: 25,
      width: 16,
      weight: 0.05
    }
  },
  {
    name: "Feels Like Home Quilt - thread pack",
    description:
      "Cottage Garden Threads – pack includes 5 skeins of stranded cotton threads. Colours: La Nonne, La Cerise, Souris ,Sweet Gum, Garcon",
    categories: "threads",
    price: 33.5,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563797118/sub%20-%20catergies%20folders/Threads/Feels_like_home_thread_pack_hq6my5.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 0.2,
      length: 20,
      width: 20,
      weight: 0.05
    }
  },
  {
    name: "Libby’s Fabric Painting DVD",
    description:
      "Learn step by step my easy fabric painting technique, as featured in my Timeless Teddies quilt and a wide variety of my other designs. Achieve beautiful results by adding a colour wash to your stitcheries,needlework and patchwork using Jo Sonja acrylic paints, fabric medium and water.",
    categories: "dvd",
    price: 25,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563797242/sub%20-%20catergies%20folders/Girls%20Day%20Out%20Quilt/dvd_lo3mmd.jpg"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 0.2,
      length: 15,
      width: 15,
      weight: 0.08
    }
  }
];

router.get("/test-route", (req, res) => {
  res.send("api working");
});

router.get("/seed", (req, res) => {
  createProduct(data);
});

const createProduct = data => {
  data.forEach(async item => {
    const query = await orderItem.findOne({ title: item.name });
    if (query === null) {
      await stripe.products.create(
        {
          name: item.name,
          type: "good",
          description: item.description
        },
        (err, product) => {
          console.log(product);

          stripe.skus.create(
            {
              product: product.id,
              price: (item.price * 100).toFixed(0),
              currency: "aud",
              inventory: { type: "infinite" },
              package_dimensions: {
                height: (item.package_dimensions.height * 2.54).toFixed(2),
                length: (item.package_dimensions.length * 2.54).toFixed(2),
                width: (item.package_dimensions.width * 2.54).toFixed(2),
                weight: (item.package_dimensions.weight * 35.274).toFixed(2)
              }
            },

            (err, sku) => {
              console.log(err);
              console.log(sku);
              const newItem = new orderItem({
                title: item.name,
                categories: [item.categories],
                sub_categories: [item.sub_categories],
                price: item.price,
                description: item.description,
                auto_process: false,
                images: item.images,
                product_id: product.id,
                sku: sku.id,
                new: item.new
              });
              if (newItem.save()) {
                console.log("success 🤓");
              } else {
                console.log("failed 🤬");
              }
            }
          );
        }
      );
    } else {
      console.log("item exists");
    }
  });
};

module.exports = router;
