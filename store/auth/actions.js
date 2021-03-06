export default {
  async login({
    commit,
    dispatch
  }, {
    user,
    strategy
  }) {
    try {
      const {
        data
      } = await this.$axios.post('/v2/auth/login', {
        credential: user.username,
        password: user.password
      })
      if (data.error) return Promise.reject(data.error)

      commit('SET_AUTH', {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        strategy: strategy
      })

      this.$storage.setUniversal('access_token', data.access_token)
      this.$storage.setUniversal('refresh_token', data.refresh_token)
      this.$storage.setUniversal('strategy', strategy)
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
      await dispatch('fetchUser')

      return Promise.resolve({
        error: null
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async socialAuth({
    commit,
    dispatch
  }, {
    strategy,
    token
  }) {
    try {
      const {
        data
      } = await this.$axios.post(`/v2/auth/social/${strategy}?token=${token}`)
      commit('SET_AUTH', {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        strategy: strategy
      })
      this.$storage.setUniversal('access_token', data.access_token)
      this.$storage.setUniversal('refresh_token', data.refresh_token)
      this.$storage.setUniversal('strategy', strategy)
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
      await dispatch('fetchUser')
    } catch (error) {
      return Promise.reject(error)
    }

    // accessToken/idToken

  },
  async logout({
    commit,
  }) {
    if (process.client) {
      this.$storage.removeUniversal('access_token')
      this.$storage.removeUniversal('refresh_token')
      this.$storage.removeUniversal('strategy')
      delete this.$axios.defaults.headers.common['Authorization']
      commit("AUTH_LOGOUT");
      commit('SET_USER', false)
      commit('wallet/SET_WEALTH', 0, {
        root: true
      })
      commit('wallet/SET_VOTE_TOKEN', 0, {
        root: true
      })
      // this.refresh
    }
  },
  async fetchUser({
    commit,
    dispatch
  }) {
    try {
      const {
        data
      } = await this.$axios.get('/v2/user/me')
      if (!data) return await dispatch('logout')
      commit('SET_USER', data)
      await dispatch('wallet/wealth', {}, {
        root: true
      })
      await dispatch('user/fetchUserSettings', {}, {
        root: true
      })
      // await dispatch('wallet/wealth', '', {
      //   root: true
      // })
      // await dispatch('user/fetchUserSettings', '', {
      //   root: true
      // })
    } catch (error) {
      console.log(error);
    }

  },
  async signup({
    commit,
    dispatch
  }, {
    user
  }) {
    try {
      const {
        data
      } = await this.$axios.post('/v2/auth/signup', {
        username: user.username,
        email: user.email,
        password: user.password
      })
      if (data.error) {
        return Promise.resolve(data)
      }
      commit('SET_AUTH', {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        strategy: 'local'
      })
      this.$storage.setUniversal('access_token', data.access_token)
      this.$storage.setUniversal('refresh_token', data.refresh_token)
      this.$storage.setUniversal('strategy', 'local')
      this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access_token
      await dispatch('fetchUser')
      return Promise.resolve({
        error: null
      })
    } catch (error) {


    }

  },
  async setPassword({
    commit
  }, {
    password,
    token
  }) {
    try {
      const {
        data
      } = await this.$axios.patch('/v2/auth/setPassword', {
        password,
        token
      })
      if (data.error) {
        return Promise.reject(data.error)
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }

  },
  async resendEmail({
    commit
  }, {
    email
  }) {
    try {
      const {
        data
      } = await this.$axios.patch('/v2/auth/resend', {
        email
      })
      if (data.error) {
        return Promise.reject(data)
      }
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async setPasswordToken({
    commit,
    state
  }, {
    email
  }) {
    try {
      const {
        data
      } = await this.$axios.patch('/v2/auth/forgot', {
        email
      })
      if (data.error) {
        return Promise.resolve({
          error: data.error
        })
      }
      return Promise.resolve({
        error: null
      })

    } catch (error) {
      return Promise.reject(error)
    }

  },
  async refresh({
    commit,
    state,
    dispatch
  }) {
    try {
      // const res = await this.$axios.get('/auth/token')
      const token = res.headers.authorization
      if (token) {
        this.$axios.defaults.headers.common['Authorization'] = token
        Cookies.set("token", token)
        Cookies.set("refresh", refresh)
        commit("AUTH_SUCCESS", {
          token: token,
          user: res.data
        });
      } else {
        dispatch('logOut')
      }

    } catch (error) {
      console.log(error);
    }
  }
}
