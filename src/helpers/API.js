import axios from 'axios'
import apiconfig from '../configs/api.config.json'

const API = {
    login: async (username, password) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER.LOGIN,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                username: username,
                password: password
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    createuser: async (username, password) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER.CREATEUSER,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                username: username,
                password: password
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    edituser: async (id_user, username, password) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER.EDITUSER,
            method: 'PUT',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                id_user: id_user,
                username: username,
                password: password
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    deleteuser: async (id_user, username, password, is_delete) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.USER.DELETEUSER,
            method: 'DELETE',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                id_user: id_user,
                username: username,
                password: password,
                is_delete: is_delete
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    createmenu: async (nama_menu, path_menu, icons_menu) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU.CREATEMENU,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                nama_menu: nama_menu,
                path_menu: path_menu,
                icons_menu: icons_menu
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    editmenu: async (id_menu, nama_menu, path_menu, icons_menu) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU.EDITMENU,
            method: 'PUT',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                id_menu: id_menu,
                nama_menu: nama_menu,
                path_menu: path_menu,
                icons_menu: icons_menu
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    deletemenu: async (id_menu, nama_menu, path_menu, icons_menu, is_delete) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MENU.DELETEMENU,
            method: 'DELETE',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                id_menu: id_menu,
                nama_menu: nama_menu,
                path_menu: path_menu,
                icons_menu: icons_menu,
                is_delete: is_delete
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    createicons: async (nama_icons) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.ICON.CREATEICON,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                nama_icons: nama_icons
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    deleteicons: async (nama_icons, is_delete) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.ICON.DELETEICON,
            method: 'DELETE',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                nama_icons: nama_icons,
                is_delete: is_delete
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    createmahasiswa: async (nim_mahasiswa, nama_mahasiswa, alamat_mahasiswa, tanggalLahir_mahasiswa, kode_fakultas, kode_jurusan, kode_provinsi, kode_kota) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA.CREATEMAHASISWA,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                nim_mahasiswa: nim_mahasiswa,
                nama_mahasiswa: nama_mahasiswa,
                alamat_mahasiswa: alamat_mahasiswa,
                tanggalLahir_mahasiswa: tanggalLahir_mahasiswa,
                kode_fakultas: {
                    kode_fakultas: kode_fakultas
                },
                kode_jurusan: {
                    kode_jurusan: kode_jurusan
                },
                kode_provinsi: {
                    kode_provinsi: kode_provinsi
                },
                kode_kota: {
                    kode_kota: kode_kota
                }
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    editmahasiswa: async (id_mahasiswa, nim_mahasiswa, nama_mahasiswa, alamat_mahasiswa, tanggalLahir_mahasiswa, kode_fakultas, kode_jurusan, kode_provinsi, kode_kota) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA.EDITMAHASISWA,
            method: 'PUT',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                id_mahasiswa: id_mahasiswa,
                nim_mahasiswa: nim_mahasiswa,
                nama_mahasiswa: nama_mahasiswa,
                alamat_mahasiswa: alamat_mahasiswa,
                tanggalLahir_mahasiswa: tanggalLahir_mahasiswa,
                kode_fakultas: {
                    kode_fakultas: kode_fakultas
                },
                kode_jurusan: {
                    kode_jurusan: kode_jurusan
                },
                kode_provinsi: {
                    kode_provinsi: kode_provinsi
                },
                kode_kota: {
                    kode_kota: kode_kota
                }
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    deletemahasiswa: async (id_mahasiswa, nim_mahasiswa, nama_mahasiswa, alamat_mahasiswa, tanggalLahir_mahasiswa, kode_fakultas, kode_jurusan, kode_provinsi, kode_kota, is_delete) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MAHASISWA.DELETEMAHASISWA,
            method: 'DELETE',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                id_mahasiswa: id_mahasiswa,
                nim_mahasiswa: nim_mahasiswa,
                nama_mahasiswa: nama_mahasiswa,
                alamat_mahasiswa: alamat_mahasiswa,
                tanggalLahir_mahasiswa: tanggalLahir_mahasiswa,
                kode_fakultas: kode_fakultas,
                kode_jurusan: kode_jurusan,
                kode_provinsi: kode_provinsi,
                kode_kota: kode_kota,
                is_delete: is_delete
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    createfakultas: async (kode_fakultas, nama_fakultas) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.FAKULTAS.CREATEFAKULTAS,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_fakultas: kode_fakultas,
                nama_fakultas: nama_fakultas
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    editfakultas: async (kode_fakultas, nama_fakultas) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.FAKULTAS.EDITFAKULTAS,
            method: 'PUT',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_fakultas: kode_fakultas,
                nama_fakultas: nama_fakultas
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    deletefakultas: async (kode_fakultas, nama_fakultas, is_delete) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.FAKULTAS.DELETEFAKULTAS,
            method: 'DELETE',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_fakultas: kode_fakultas,
                nama_fakultas: nama_fakultas,
                is_delete: is_delete
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    createjurusan: async (kode_jurusan, nama_jurusan, kode_fakultas) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.JURUSAN.CREATEJURUSAN,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_jurusan: kode_jurusan,
                nama_jurusan: nama_jurusan,
                kode_fakultas: {
                    kode_fakultas: kode_fakultas
                }
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    editjurusan: async (kode_jurusan, nama_jurusan, kode_fakultas) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.JURUSAN.EDITJURUSAN,
            method: 'PUT',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_jurusan: kode_jurusan,
                nama_jurusan: nama_jurusan,
                kode_fakultas: {
                    kode_fakultas: kode_fakultas
                }
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    deletejurusan: async (kode_jurusan, nama_jurusan, kode_fakultas, is_delete) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.JURUSAN.DELETEJURUSAN,
            method: 'DELETE',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_jurusan: kode_jurusan,
                nama_jurusan: nama_jurusan,
                kode_fakultas: kode_fakultas,
                is_delete: is_delete
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    creatematkul: async (kode_matkul, nama_matkul, semester, sks) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MATKUL.CREATEMATKUL,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_matkul: kode_matkul,
                nama_matkul: nama_matkul,
                semester: semester,
                sks: sks
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    creatematkuldetail: async (kode_matkul, kode_jurusan) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MATKUL.CREATEMATKULDETAIL,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_matkul: {
                    kode_matkul: kode_matkul
                },
                kode_jurusan: {
                    kode_jurusan: kode_jurusan
                } 
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    editmatkul: async (kode_matkul, nama_matkul, kode_jurusan, semester, sks) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MATKUL.EDITMATKUL,
            method: 'PUT',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_matkul: kode_matkul,
                nama_matkul: nama_matkul,
                kode_jurusan: {
                    kode_jurusan: kode_jurusan
                },
                semester: semester,
                sks: sks
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    deletematkul: async (kode_matkul, nama_matkul, kode_jurusan, semester, sks, is_delete) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.MATKUL.DELETEMATKUL,
            method: 'DELETE',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_matkul: kode_matkul,
                nama_matkul: nama_matkul,
                kode_jurusan: kode_jurusan,
                semester: semester,
                sks: sks,
                is_delete: is_delete
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    createprovinsi: async (kode_provinsi, nama_provinsi) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PROVINSI.CREATEPROVINSI,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_provinsi: kode_provinsi,
                nama_provinsi: nama_provinsi
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    editprovinsi: async (kode_provinsi, nama_provinsi) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PROVINSI.EDITPROVINSI,
            method: 'PUT',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_provinsi: kode_provinsi,
                nama_provinsi: nama_provinsi
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    deleteprovinsi: async (kode_provinsi, nama_provinsi, is_delete) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.PROVINSI.DELETEPROVINSI,
            method: 'DELETE',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_provinsi: kode_provinsi,
                nama_provinsi: nama_provinsi,
                is_delete: is_delete
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    createkota: async (kode_kota, nama_kota, kode_provinsi) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.KOTA.CREATEKOTA,
            method: 'POST',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_kota: kode_kota,
                nama_kota: nama_kota,
                kode_provinsi: {
                    kode_provinsi: kode_provinsi
                }
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    editkota: async (kode_kota, nama_kota, kode_provinsi) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.KOTA.EDITKOTA,
            method: 'PUT',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_kota: kode_kota,
                nama_kota: nama_kota,
                kode_provinsi: {
                    kode_provinsi: kode_provinsi
                }
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
    deletekota: async (kode_kota, nama_kota, kode_provinsi, is_delete) => {
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.KOTA.DELETEKOTA,
            method: 'DELETE',
            headers: {
                'Accept-Language': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                kode_kota: kode_kota,
                nama_kota: nama_kota,
                kode_provinsi: kode_provinsi,
                is_delete: is_delete
            }
        }
        try {
            let result = await axios(option)
            alert('test'+JSON.stringify(result))
            return result
        } catch (error) {
            alert('error')
            return error.response.data                       
        }
    },
}

export default API
