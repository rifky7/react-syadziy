import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeFile from './Home'
import ListMenuFile from '../menu/ListMenu'
import ListIconsFile from '../icons/ListIcons'
import ListUserFile from '../content/user/ListUser'
import ListMahasiswaFile from '../content/mahasiswa/ListMahasiswa'
import ListFakultasFile from '../content/fakultas/ListFakultas'
import ListJurusanFile from '../content/jurusan/ListJurusan'
import ListMatkulFile from '../content/matkul/ListMatkul'
import ListProvinsiFile from '../content/provinsi/ListProvinsi'
import ListKotaFile from '../content/kota/ListKota'
import { Redirect } from 'react-router';
import apiconfig from '../../configs/api.config.json'

const DashboardSwitcher = () => {

    return (

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <Switch>
              <Route path="/dashboard" component={HomeFile} />
              <Route path="/listmenu" component={ListMenuFile} />
              <Route path="/listicons" component={ListIconsFile} />
              <Route path="/listuser" component={ListUserFile} />
              <Route path="/listmahasiswa" component={ListMahasiswaFile} />
              <Route path="/listfakultas" component={ListFakultasFile} />
              <Route path="/listjurusan" component={ListJurusanFile} />
              <Route path="/listmatkul" component={ListMatkulFile} />
              <Route path="/listprovinsi" component={ListProvinsiFile} />
              <Route path="/listkota" component={ListKotaFile} />
            </Switch>
        </main>
    )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(apiconfig.LS.TOKEN)!=null? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
export default DashboardSwitcher
