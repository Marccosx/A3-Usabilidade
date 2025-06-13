import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'

import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'
import food_9 from './food_9.png'
import food_10 from './food_10.png'
import food_11 from './food_11.png'
import food_12 from './food_12.png'
import food_13 from './food_13.png'
import food_14 from './food_14.png'
import food_15 from './food_15.png'
import food_16 from './food_16.png'
import food_17 from './food_17.png'
import food_18 from './food_18.png'
import food_19 from './food_19.png'
import food_20 from './food_20.png'
import food_21 from './food_21.png'
import food_22 from './food_22.png'
import food_23 from './food_23.png'
import food_24 from './food_24.png'
import food_25 from './food_25.png'
import food_26 from './food_26.png'
import food_27 from './food_27.png'
import food_28 from './food_28.png'
import food_29 from './food_29.png'
import food_30 from './food_30.png'
import food_31 from './food_31.png'
import food_32 from './food_32.png'

import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import remove_icon_cross from './remove_icon_cross.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'

export const assets = {
    logo,
    basket_icon,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    remove_icon_cross,
    app_store,
    play_store,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon
}

export const menu_list = [
    {
        menu_name: "Lanches",
        menu_image: menu_1,
        categoria: "Lanches"
    },
    {
        menu_name: "Almoço",
        menu_image: menu_2,
        categoria: "Almoço"
    },
    {
        menu_name: "Vegano",
        menu_image: menu_3,
        categoria: "Vegano"
    },
    {
        menu_name: "Outros",
        menu_image: menu_4,
        categoria: "Outros"
    }
]

export const food_list = [
    {
        _id: "1",
        name: "Salada Grega",
        image: food_1,
        price: 12,
        description: "Salada fresca com pepino, tomate, azeitonas e queijo feta",
        category: "Saladas"
    },
    {
        _id: "2",
        name: "Salada Vegetariana",
        image: food_2,
        price: 18,
        description: "Mix de folhas com legumes grelhados e molho especial",
        category: "Saladas"
    },
    {
        _id: "3",
        name: "Salada Primavera",
        image: food_3,
        price: 16,
        description: "Salada colorida com frutas da estação e molho cítrico",
        category: "Saladas"
    },
    {
        _id: "4",
        name: "Salada de Frango",
        image: food_4,
        price: 24,
        description: "Salada com tiras de frango grelhado e molho caesar",
        category: "Saladas"
    },
    {
        _id: "5",
        name: "Rolinhos de Lasanha",
        image: food_5,
        price: 14,
        description: "Rolinhos de massa recheados com queijo e molho de tomate",
        category: "Rolinhos"
    },
    {
        _id: "6",
        name: "Rolinhos Peri Peri",
        image: food_6,
        price: 12,
        description: "Rolinhos apimentados com molho peri peri",
        category: "Rolinhos"
    },
    {
        _id: "7",
        name: "Rolinhos de Frango",
        image: food_7,
        price: 20,
        description: "Rolinhos crocantes recheados com frango temperado",
        category: "Rolinhos"
    },
    {
        _id: "8",
        name: "Rolinhos Vegetarianos",
        image: food_8,
        price: 15,
        description: "Rolinhos recheados com legumes frescos",
        category: "Rolinhos"
    },
    {
        _id: "9",
        name: "Sorvete Mesclado",
        image: food_9,
        price: 14,
        description: "Sorvete cremoso com calda especial mesclada",
        category: "Sobremesas"
    },
    {
        _id: "10",
        name: "Sorvete de Frutas",
        image: food_10,
        price: 22,
        description: "Sorvete artesanal com pedaços de frutas naturais",
        category: "Sobremesas"
    },
    {
        _id: "11",
        name: "Sorvete no Pote",
        image: food_11,
        price: 10,
        description: "Sorvete cremoso servido em pote decorado",
        category: "Sobremesas"
    },
    {
        _id: "12",
        name: "Sorvete de Baunilha",
        image: food_12,
        price: 12,
        description: "Sorvete tradicional de baunilha com calda quente",
        category: "Sobremesas"
    },
    {
        _id: "13",
        name: "Sanduíche de Frango",
        image: food_13,
        price: 12,
        description: "Sanduíche com frango grelhado e molho especial",
        category: "Sanduíches"
    },
    {
        _id: "14",
        name: "Sanduíche Vegano",
        image: food_14,
        price: 18,
        description: "Sanduíche com hambúrguer de grão-de-bico e legumes",
        category: "Sanduíches"
    },
    {
        _id: "15",
        name: "Sanduíche Grelhado",
        image: food_15,
        price: 16,
        description: "Sanduíche quente com queijo derretido",
        category: "Sanduíches"
    },
    {
        _id: "16",
        name: "Sanduíche Natural",
        image: food_16,
        price: 24,
        description: "Sanduíche leve com pasta de atum e salada",
        category: "Sanduíches"
    },
    {
        _id: "17",
        name: "Cupcake",
        image: food_17,
        price: 14,
        description: "Cupcake decorado com cobertura cremosa",
        category: "Bolos"
    },
    {
        _id: "18",
        name: "Bolo Vegano",
        image: food_18,
        price: 12,
        description: "Bolo sem ingredientes de origem animal",
        category: "Bolos"
    },
    {
        _id: "19",
        name: "Bolo de Doce de Leite",
        image: food_19,
        price: 20,
        description: "Bolo recheado com doce de leite caseiro",
        category: "Bolos"
    },
    {
        _id: "20",
        name: "Bolo em Fatia",
        image: food_20,
        price: 15,
        description: "Fatia generosa de bolo do dia",
        category: "Bolos"
    },
    {
        _id: "21",
        name: "Cogumelos ao Alho",
        image: food_21,
        price: 14,
        description: "Cogumelos frescos salteados com alho e ervas",
        category: "Vegetariano"
    },
    {
        _id: "22",
        name: "Couve-flor Frita",
        image: food_22,
        price: 22,
        description: "Couve-flor empanada e frita com molho especial",
        category: "Vegetariano"
    },
    {
        _id: "23",
        name: "Arroz com Legumes",
        image: food_23,
        price: 10,
        description: "Arroz integral com mix de legumes frescos",
        category: "Vegetariano"
    },
    {
        _id: "24",
        name: "Abobrinha Recheada",
        image: food_24,
        price: 12,
        description: "Abobrinha recheada com quinoa e legumes",
        category: "Vegetariano"
    },
    {
        _id: "25",
        name: "Massa ao Queijo",
        image: food_25,
        price: 12,
        description: "Massa fresca com molho quatro queijos",
        category: "Massas"
    },
    {
        _id: "26",
        name: "Massa ao Sugo",
        image: food_26,
        price: 18,
        description: "Massa com molho de tomate caseiro e manjericão",
        category: "Massas"
    },
    {
        _id: "27",
        name: "Massa ao Creme",
        image: food_27,
        price: 16,
        description: "Massa com molho cremoso e champignons",
        category: "Massas"
    },
    {
        _id: "28",
        name: "Massa com Frango",
        image: food_28,
        price: 24,
        description: "Massa com frango desfiado e molho branco",
        category: "Massas"
    },
    {
        _id: "29",
        name: "Macarrão na Manteiga",
        image: food_29,
        price: 14,
        description: "Macarrão na manteiga com ervas frescas",
        category: "Macarrão"
    },
    {
        _id: "30",
        name: "Macarrão com Legumes",
        image: food_30,
        price: 12,
        description: "Macarrão salteado com legumes da estação",
        category: "Macarrão"
    },
    {
        _id: "31",
        name: "Macarrão Oriental",
        image: food_31,
        price: 20,
        description: "Macarrão fino ao estilo oriental com legumes",
        category: "Macarrão"
    },
    {
        _id: "32",
        name: "Macarrão ao Molho",
        image: food_32,
        price: 15,
        description: "Macarrão com molho especial da casa",
        category: "Macarrão"
    }
]
