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
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503614/Vintage%20Teddies%20Stitchery%20version%20quilt/full_quilt_block_10_-_s_xhfqke.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503605/Vintage%20Teddies%20Stitchery%20version%20quilt/block_1_-_s_z5kqlb.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503598/Vintage%20Teddies%20Stitchery%20version%20quilt/block_2_-_s_tjwaft.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503611/Vintage%20Teddies%20Stitchery%20version%20quilt/block_-_s_pcqtkj.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503626/Vintage%20Teddies%20Stitchery%20version%20quilt/block_4_-_s_x9xgau.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503624/Vintage%20Teddies%20Stitchery%20version%20quilt/block_5_-_s_l3lo2l.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503617/Vintage%20Teddies%20Stitchery%20version%20quilt/block_6_-_s_afkkug.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503624/Vintage%20Teddies%20Stitchery%20version%20quilt/block_7_-_s_ye2zv7.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503605/Vintage%20Teddies%20Stitchery%20version%20quilt/block_8_-_s_hb0xkf.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503611/Vintage%20Teddies%20Stitchery%20version%20quilt/block_9_-_s_szflhq.png"
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
    name: "Vintage Teddies Applique Quilt",
    description:
      "Set of 10 Patterns. Nine gorgeous teddy applique patterns. Make into a quilt or use for any projects you wish. I have used a mix of wool felt, check fabrics, yarn dyes, wovens and plain cotton. Finished size of quilt is 57” x 57”",
    categories: "bom quilts",
    sub_categories: "bom patterns only",
    price: 165.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503980/Vintage%20Teddies%20Applique%20quilt%20blocks/Vintage_Teddies_Applique_quilt_sej4eh.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503984/Vintage%20Teddies%20Applique%20quilt%20blocks/block_1_jj6bnq.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503971/Vintage%20Teddies%20Applique%20quilt%20blocks/block_2_rkvej0.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503971/Vintage%20Teddies%20Applique%20quilt%20blocks/block_3_psq7yx.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503978/Vintage%20Teddies%20Applique%20quilt%20blocks/block_4_df5smu.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503975/Vintage%20Teddies%20Applique%20quilt%20blocks/block_5_pomu6c.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503988/Vintage%20Teddies%20Applique%20quilt%20blocks/Block_6_jvijxk.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503987/Vintage%20Teddies%20Applique%20quilt%20blocks/Block_7_cyx8xc.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503976/Vintage%20Teddies%20Applique%20quilt%20blocks/Block_8_twtcik.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563503984/Vintage%20Teddies%20Applique%20quilt%20blocks/block_9_canwxk.png"
    ],
    auto_process: false,
    new: false,
    package_dimensions: {
      height: 2.5,
      length: 25,
      width: 16,
      weight: 0.33
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
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505339/Libby_s%20Mystery%20Quilt/Libby_s_Mystery_Quil_-_full_quilt_qx5eex.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505309/Libby_s%20Mystery%20Quilt/block_1_fkcvi1.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505304/Libby_s%20Mystery%20Quilt/block_2_eddfpc.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505288/Libby_s%20Mystery%20Quilt/block_3_xp2esp.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505335/Libby_s%20Mystery%20Quilt/block_4_h99lfk.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505316/Libby_s%20Mystery%20Quilt/block_5_zqx2ww.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505330/Libby_s%20Mystery%20Quilt/block_6_cf7abj.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505302/Libby_s%20Mystery%20Quilt/block_7_lyyxaw.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505274/Libby_s%20Mystery%20Quilt/block_8_aw0mqi.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505269/Libby_s%20Mystery%20Quilt/block_9_xzgzxp.png"
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
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505432/Girls%20Day%20Out%20Quilt/full_quilt_-_block_12_ihxmad.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505396/Girls%20Day%20Out%20Quilt/Gdo_block_1_tcuvge.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505359/Girls%20Day%20Out%20Quilt/Gdo_block_2_qzpzv3.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505352/Girls%20Day%20Out%20Quilt/Gdo_block_3_gbkryg.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505406/Girls%20Day%20Out%20Quilt/Gdo_block_4_dpqbhz.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505376/Girls%20Day%20Out%20Quilt/Gdo_block_5_qhzgaf.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505404/Girls%20Day%20Out%20Quilt/Gdo_block_6_zx4uil.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505419/Girls%20Day%20Out%20Quilt/Gdo_block_7_c7xexh.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505441/Girls%20Day%20Out%20Quilt/Gdo_block_8_whzspz.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505447/Girls%20Day%20Out%20Quilt/Gdo_block_9_tlmhdi.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505418/Girls%20Day%20Out%20Quilt/Gdo_block_10_mygqkr.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505433/Girls%20Day%20Out%20Quilt/Gdo_block_11_qyupoe.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563505432/Girls%20Day%20Out%20Quilt/full_quilt_-_block_12_ihxmad.png"
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
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504649/Sew%20Sweet%20Full%20quilt%20Patterns/Sew_Sweet_full_quilt_esibef.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_1_rcobgy.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_2_gapq4n.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504655/Sew%20Sweet%20Full%20quilt%20Patterns/block_3_kgeet3.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_4_aearbb.png"
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
    name: "Test item - Stichery patterns - pattern only",
    description:
      "Set of 5 Patterns. Five sweet teddy stitcheries for you to hand stitch. Make into a quilt or use for any projects you wish. These would also look lovely with a wash of colour with Jo Sonja paints or coloured pencils. Finished size of quilt is 57” x 57”",
    categories: "stitchery patterns",
    sub_categories: "pattern only",
    price: 75.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504649/Sew%20Sweet%20Full%20quilt%20Patterns/Sew_Sweet_full_quilt_esibef.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_1_rcobgy.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_2_gapq4n.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504655/Sew%20Sweet%20Full%20quilt%20Patterns/block_3_kgeet3.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_4_aearbb.png"
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
    name: "Test item - Christmas",
    description:
      "Set of 5 Patterns. Five sweet teddy stitcheries for you to hand stitch. Make into a quilt or use for any projects you wish. These would also look lovely with a wash of colour with Jo Sonja paints or coloured pencils. Finished size of quilt is 57” x 57”",
    categories: "christmas",
    price: 75.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504649/Sew%20Sweet%20Full%20quilt%20Patterns/Sew_Sweet_full_quilt_esibef.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_1_rcobgy.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_2_gapq4n.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504655/Sew%20Sweet%20Full%20quilt%20Patterns/block_3_kgeet3.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_4_aearbb.png"
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
    name: "Test item - Bags",
    description:
      "Set of 5 Patterns. Five sweet teddy stitcheries for you to hand stitch. Make into a quilt or use for any projects you wish. These would also look lovely with a wash of colour with Jo Sonja paints or coloured pencils. Finished size of quilt is 57” x 57”",
    categories: "bags",
    price: 75.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504649/Sew%20Sweet%20Full%20quilt%20Patterns/Sew_Sweet_full_quilt_esibef.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_1_rcobgy.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_2_gapq4n.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504655/Sew%20Sweet%20Full%20quilt%20Patterns/block_3_kgeet3.png",
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504656/Sew%20Sweet%20Full%20quilt%20Patterns/block_4_aearbb.png"
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
    name: "Test item - PDF Patterns - quilts",
    description:
      "Set of 5 Patterns. Five sweet teddy stitcheries for you to hand stitch. Make into a quilt or use for any projects you wish. These would also look lovely with a wash of colour with Jo Sonja paints or coloured pencils. Finished size of quilt is 57” x 57”",
    categories: "pdf patterns",
    sub_categories: "quilts",
    price: 15.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504649/Sew%20Sweet%20Full%20quilt%20Patterns/Sew_Sweet_full_quilt_esibef.png"
    ],
    auto_process: true,
    new: false,
    package_dimensions: {
      height: 1.0,
      length: 25,
      width: 16,
      weight: 0.13
    }
  },
  {
    name: "Test item - DVD",
    description:
      "Set of 5 Patterns. Five sweet teddy stitcheries for you to hand stitch. Make into a quilt or use for any projects you wish. These would also look lovely with a wash of colour with Jo Sonja paints or coloured pencils. Finished size of quilt is 57” x 57”",
    categories: "christmas",
    price: 15.0,
    images: [
      "https://res.cloudinary.com/df3pjfvyx/image/upload/v1563504649/Sew%20Sweet%20Full%20quilt%20Patterns/Sew_Sweet_full_quilt_esibef.png"
    ],
    auto_process: true,
    new: false,
    package_dimensions: {
      height: 1.0,
      length: 25,
      width: 16,
      weight: 0.13
    }
  }
];

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
          stripe.skus.create(
            {
              product: product.id,
              price: item.price * 100,
              currency: "aud",
              inventory: { type: "infinite" },
              package_dimensions: {
                height: item.package_dimensions.height,
                length: item.package_dimensions.length,
                width: item.package_dimensions.width,
                weight: item.package_dimensions.weight
              }
            },

            (err, sku) => {
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
