/* =========================================================
   LOJA — CONFIGURAÇÃO
========================================================= */

const SHOP_CONFIG = {

    /* =====================================================
       IDENTIDADE
    ===================================================== */

    storeName: "Sabor da Praça",

    heroTitle:
        "O sabor que chega até você.",

    heroDescription:
        "Faça seu pedido de forma rápida, simples e segura.",


    /* =====================================================
       WHATSAPP
    ===================================================== */

    whatsappNumber:
        "5517999999999",


    /* =====================================================
       ENTREGA
    ===================================================== */

    delivery: {

        enabled: true,

        fee: 10.00,

        minimumOrder: 0

    },


    /* =====================================================
       PAGAMENTO
    ===================================================== */

    pixKey:
        "12.345.678/0001-90",


    /* =====================================================
       INFORMAÇÕES DA LOJA
    ===================================================== */

    storeAddress:
        "Rua Exemplo, 123 — Centro, Jales — SP"

};


/* =========================================================
   PRODUTOS
========================================================= */

const products = [

    /* =====================================================
       PRODUTO 1
    ===================================================== */

    {

        id: 1,

        name:
            "Pizza Calabresa",

        category:
            "Pizzas",

        price:
            39.90,

        oldPrice:
            null,

        image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",

        description:
            "Pizza de calabresa com molho de tomate, queijo mussarela, calabresa fatiada e cebola.",

        stock:
            true

    },


    /* =====================================================
       PRODUTO 2
    ===================================================== */

    {

        id: 2,

        name:
            "Pizza Frango com Catupiry",

        category:
            "Pizzas",

        price:
            42.90,

        oldPrice:
            null,

        image:
            "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=85",

        description:
            "Pizza preparada com frango desfiado, queijo mussarela e catupiry cremoso.",

        stock:
            true

    },


    /* =====================================================
       PRODUTO 3
    ===================================================== */

    {

        id: 3,

        name:
            "Pizza Mussarela",

        category:
            "Pizzas",

        price:
            36.90,

        oldPrice:
            42.90,

        image:
            "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85",

        description:
            "Pizza clássica de mussarela com molho de tomate e queijo derretido.",

        stock:
            true

    },


    /* =====================================================
       PRODUTO 4
    ===================================================== */

    {

        id: 4,

        name:
            "Refrigerante 2L",

        category:
            "Bebidas",

        price:
            9.90,

        oldPrice:
            null,

        image:
            "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=900&q=85",

        description:
            "Refrigerante de 2 litros para acompanhar seu pedido.",

        stock:
            true

    },


    /* =====================================================
       PRODUTO 5
    ===================================================== */

    {

        id: 5,

        name:
            "Combo X-Burger",

        category:
            "Lanches",

        price:
            28.90,

        oldPrice:
            32.90,

        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",

        description:
            "Hambúrguer artesanal com queijo, molho especial e acompanhamento.",

        stock:
            true

    },


    /* =====================================================
       PRODUTO 6
    ===================================================== */

    {

        id: 6,

        name:
            "Batata Frita",

        category:
            "Porções",

        price:
            18.90,

        oldPrice:
            null,

        image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",

        description:
            "Porção de batatas fritas crocantes, preparada na hora.",

        stock:
            true

    }

];