<template>
  <div class="edit">
    <div class="breadcrumb">
      <span @click="$router.push('/')" class="breadcrumb-previous cursor-pointer">{{ $t('my_page.top_page') }}</span>
      <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
      <span @click="$router.push('/basic-information')" class="breadcrumb-previous cursor-pointer">{{ $t('my_page.basic_information') }}</span>
      <img class="breadcrumb-arrow" src="../assets/icons/breadcrumb-arrow.svg" />
      <img class="breadcrumb-arrow-sp show-sp" src="../assets/icons/breadcrumb-arrow-black.svg" @click="$router.push('/basic-information')" />
      <span class="breadcrumb-current">{{ $t('my_page.edit_basic_information') }}</span>
    </div>
    <el-form ref="accountForm" :model="accountForm" :rules="accountRules" autocomplete="off">
      <div class="edit-table edit-pc">
        <div class="edit-container">
          <div class="edit-col">
            <div class="edit-title">{{ $t('career.store_name') }}</div>
            <div class="top-text">{{ accountForm.store_name }}</div>
          </div>
          <div class="edit-col">
            <div class="edit-title justify-between">
              <span>{{ $t('my_page.name') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
              <div class="d-flex g-24 edit-content">
                <div class="wp-100" ref="first_name">
                  <el-form-item prop="first_name" :error="(error.key === 'first_name') ? error.value : ''">
                    <el-input
                      maxlength="255"
                      @focus="resetValidate('first_name')"
                      v-model.trim="accountForm.first_name"
                      :placeholder="$t('information.first_name')"
                    />
                  </el-form-item>
                </div>
                <div class="wp-100" ref="last_name">
                  <el-form-item prop="last_name" :error="(error.key === 'last_name') ? error.value : ''">
                    <el-input
                      maxlength="255"
                      @focus="resetValidate('last_name')"
                      v-model.trim="accountForm.last_name"
                      :placeholder="$t('information.last_name')"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title justify-between">
                <span>{{ $t('my_page.furi') }}</span>
                <div class="required-field">{{ $t('form.required') }}</div>
              </div>
              <div class="d-flex g-24 edit-content">
                <div class="wp-100" ref="furi_first_name">
                  <el-form-item prop="furi_first_name" :error="(error.key === 'furi_first_name') ? error.value : ''">
                    <el-input
                      maxlength="255"
                      @focus="resetValidate('furi_first_name')"
                      v-model.trim="accountForm.furi_first_name"
                      :placeholder="$t('information.furi_first_name')"
                    />
                  </el-form-item>
                </div>
                <div class="wp-100" ref="furi_last_name">
                  <el-form-item prop="furi_last_name" :error="(error.key === 'furi_last_name') ? error.value : ''">
                    <el-input
                      maxlength="255"
                      @focus="resetValidate('furi_last_name')"
                      v-model.trim="accountForm.furi_last_name"
                      :placeholder="$t('information.furi_last_name')"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">{{ $t('career.company_name') }}</div>
              <div ref="company_name" class="edit-content">
                <el-form-item prop="company_name" :error="(error.key === 'company_name') ? error.value : ''">
                  <el-input
                    maxlength="255"
                    v-model="accountForm.company_name"
                    @focus="resetValidate('company_name')"
                    :placeholder="$t('career.company_name')"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">{{ $t('page.home') }}</div>
              <div ref="home_page_recruiter" class="edit-content">
                <el-form-item prop="home_page_recruiter" :error="(error.key === 'home_page_recruiter') ? error.value : ''">
                  <el-input
                    maxlength="255"
                    @focus="resetValidate('home_page_recruiter')"
                    v-model.trim="accountForm.home_page_recruiter"
                    :placeholder="$t('page.home')"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title justify-between">
                <span>{{ $t('my_page.phone') }}</span>
                <div class="required-field">{{ $t('form.required') }}</div>
              </div>
              <div ref="tel" class="edit-content">
                <el-form-item prop="tel" :error="(error.key === 'tel') ? error.value : ''">
                  <el-input
                    name="tel"
                    @input="phoneInput"
                    @focus="resetValidate('tel')"
                    type="text"
                    tabindex="2"
                    pattern="[0-9]*"
                    placeholder="000-1230-0001"
                    class="w-252"
                    v-model.trim="accountForm.tel"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title justify-between">
              </div>
              <div ref="postal_code" class="edit-content long-col">
                <el-form-item prop="postal_code" :error="(error.key === 'postal_code') ? error.value : ''">
                  <el-input
                    pattern="[0-9]*"
                    @blur="blurPostCode"
                    @focus="focusPostCode"
                    @input="zipCodeInput"
                    @change="handleChange"
                    placeholder="000-0000"
                    class="w-130"
                    v-model.trim="accountForm.postal_code"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title justify-between">
                <span>{{ $t('my_page.address') }}</span>
                <div class="required-field">{{ $t('form.required') }}</div>
              </div>
              <div class="sub-col">
                  <div ref="province_id" class="edit-content_sub">
                    <span>{{ $t('my_page.prefectures') }}</span>
                    <el-form-item prop="province_id" :error="(error.key === 'province_id') ? error.value : ''">
                      <el-select
                        v-model="accountForm.province_id"
                        @change="selectCity"
                        @focus="resetValidate('province_id')"
                        @visible-change="(val) => { changeSelect(val, 'province_id') }"
                        :placeholder="$t('common.select')"
                        class="w-130"
                      >
                        <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>
                  </el-form-item>
                  </div>
                <div ref="province_city_id" class="edit-content_sub">
                  <span>{{ $t('my_page.municipalities') }}</span>
                  <el-form-item prop="province_city_id" :error="(error.key === 'province_city_id') ? error.value : ''">
                    <el-select
                      v-model.trim="accountForm.province_city_id"
                      @focus="resetValidate('province_city_id')"
                      @visible-change="(val) => { changeSelect(val, 'province_city_id') }"
                      class="w-130"
                      :disabled="listProvinceCity.length === 0"
                      :placeholder="$t('common.select')"
                    >
                      <el-option v-for="item in listProvinceCity" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </div>
                <div ref="address" class="edit-content_sub">
                  <span>{{ $t('my_page.address2') }}</span>
                  <el-form-item prop="address" :error="(error.key === 'address') ? error.value : ''">
                    <el-input
                      maxlength="255"
                      :placeholder="placeholder.address"
                      @focus="resetValidate('address')"
                      class="w-130"
                      v-model.trim="accountForm.address"
                    />
                  </el-form-item>
                </div>
                <div ref="building" class="edit-content_sub">
                  <span>{{ $t('my_page.building_name') }}</span>
                  <el-form-item prop="building" :error="(error.key === 'building') ? error.value : ''">
                    <el-input
                      maxlength="255"
                      :placeholder="placeholder.building"
                      @focus="resetValidate('building')"
                      class="w-195"
                      v-model.trim="accountForm.building"
                    />
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">{{ $t('my_page.representative_name') }}</div>
              <div ref="alias_name" class="edit-content">
                <el-form-item prop="alias_name" :error="(error.key === 'alias_name') ? error.value : ''">
                  <el-input
                    maxlength="255"
                    @focus="resetValidate('alias_name')"
                    :placeholder="$t('my_page.representative_name')"
                    v-model="accountForm.alias_name"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">{{ $t('my_page.number_of_employees') }}</div>
              <div ref="employee_quantity" class="edit-content">
                <el-form-item prop="employee_quantity" :error="(error.key === 'employee_quantity') ? error.value : ''">
                  <el-input
                    maxlength="255"
                    @focus="resetValidate('employee_quantity')"
                    :placeholder="$t('my_page.number_of_employees')"
                    v-model.trim="accountForm.employee_quantity"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">{{ $t('my_page.establish') }}</div>
                <div ref="establish" class="edit-content edit-time-col">
                  <el-form-item prop="establish" :error="(error.key === 'establish') ? error.value : ''">
                    <div class="d-flex pb-4">
                      <div class="d-flex items-center">
                          <el-select
                            v-model="accountForm.year"
                            class="w-90 select-datetime"
                            placeholder="YYYY"
                            @focus="resetValidate('establish')"
                            @blur="validate('establish')"
                          >
                            <el-option v-for="item in linksYear" :key="item.value" :label="item.value" :value="item.value" />
                          </el-select>
                          <span class="col-time">{{ $t('my_page.year') }}</span>
                        </div>
                        <div class="d-flex items-center">
                          <el-select
                            v-model="accountForm.month"
                            class="w-90 select-datetime"
                            placeholder="MM"
                            @focus="resetValidate('establish')"
                            @blur="validate('establish')"
                          >
                            <el-option v-for="item in linksMonth" :key="item.value" :label="item.value" :value="item.value" />
                          </el-select>
                          <span class="col-time">{{ $t('my_page.month') }}</span>
                        </div>
                    </div>
                  </el-form-item>
                </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">{{ $t('my_page.capital') }}</div>
              <div ref="capital_stock" class="edit-content">
                <el-form-item prop="capital_stock" :error="(error.key === 'capital_stock') ? error.value : ''">
                  <el-input
                    maxlength="255"
                    :placeholder="$t('my_page.capital')"
                    v-model.trim="accountForm.capital_stock"
                    @focus="resetValidate('capital_stock')"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">{{ $t('my_page.manager') }}</div>
              <div ref="manager_name" class="edit-content">
                <el-form-item prop="manager_name" :error="(error.key === 'manager_name') ? error.value : ''">
                  <el-input
                    maxlength="255"
                    :placeholder="$t('my_page.manager')"
                    v-model.trim="accountForm.manager_name"
                    @focus="resetValidate('manager_name')"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">LINE ID </div>
              <div ref="line" class="edit-content">
                <el-form-item prop="line" :error="(error.key === 'line') ? error.value : ''">
                  <el-input
                    maxlength="255"
                    @focus="resetValidate('line')"
                    :placeholder="placeholder.line"
                    v-model.trim="accountForm.line"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">Facebook</div>
              <div ref="facebook" class="edit-content">
                <el-form-item prop="facebook" :error="(error.key === 'facebook') ? error.value : ''">
                  <el-input
                    maxlength="255"
                    @focus="resetValidate('facebook')"
                    :placeholder="placeholder.facebook"
                    v-model.trim="accountForm.facebook"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">Instagram</div>
              <div ref="instagram" class="edit-content">
                <el-form-item prop="instagram" :error="(error.key === 'instagram') ? error.value : ''">
                  <el-input
                    maxlength="255"
                    @focus="resetValidate('instagram')"
                    :placeholder="placeholder.instagram"
                    v-model.trim="accountForm.instagram"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col">
              <div class="edit-title">Twitter</div>
              <div ref="twitter" class="edit-content">
                <el-form-item prop="twitter" :error="(error.key === 'twitter') ? error.value : ''">
                  <el-input
                    maxlength="255"
                    @focus="resetValidate('twitter')"
                    :placeholder="placeholder.twitter"
                    v-model.trim="accountForm.twitter"
                  />
                </el-form-item>
              </div>
            </div>
            <div class="edit-col last-input">
              <div class="edit-title">{{ $t('my_page.usage_status') }}</div>
              <div class="edit-content">
              </div>
            </div>
            <div class="edit-button">
              <el-button type="danger" @click="update">{{ $t('my_page.save') }}</el-button>
            </div>
        </div>
      </div>
    </el-form>
    <el-form ref="accountFormSp" :model="accountForm" :rules="accountRules" autocomplete="off">
      <div class="edit-table edit-sp">
        <el-form-item prop="store_name" :error="(error.key === 'store_name') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">{{ $t('career.store_name') }}</div>
            <el-input disabled class="store_name" v-model="accountForm.store_name"></el-input>
          </div>
        </el-form-item>
        <div>
          <div class="d-flex">
            <span class="edit-title-sp">{{ $t('my_page.name') }}</span>
            <div class="required-field">{{ $t('form.required') }}</div>
          </div>
        </div>
        <div class="edit-col-sp gap-10">
          <el-form-item prop="first_name" :error="(error.key === 'first_name') ? error.value : ''">
            <div class="edit-title-sp d-flex flex-col">
              <el-input
                maxlength="255"
                @focus="resetValidate('first_name')"
                v-model.trim="accountForm.first_name"
                :placeholder="$t('information.first_name')"
              />
            </div>
          </el-form-item>
          <el-form-item prop="last_name" :error="(error.key === 'last_name') ? error.value : ''">
            <div class="edit-title-sp d-flex flex-col">
              <div class="d-flex">
              </div>
              <el-input
                maxlength="255"
                :placeholder="placeholder.last_name"
                @focus="resetValidate('last_name')"
                v-model.trim="accountForm.last_name"
              />
            </div>
          </el-form-item>
        </div>
        <div>
          <div class="d-flex">
            <span class="edit-title-sp">{{ $t('my_page.furi') }}</span>
            <div class="required-field">{{ $t('form.required') }}</div>
          </div>
        </div>
        <div class="edit-col-sp gap-10">
          <el-form-item prop="furi_first_name" :error="(error.key === 'furi_first_name') ? error.value : ''">
            <div class="edit-title-sp d-flex flex-col">
              <el-input
                maxlength="255"
                @focus="resetValidate('furi_first_name')"
                v-model.trim="accountForm.furi_first_name"
                :placeholder="$t('information.furi_first_name')"
              />
            </div>
          </el-form-item>
          <el-form-item prop="furi_last_name" :error="(error.key === 'furi_last_name') ? error.value : ''">
            <div class="edit-title-sp d-flex flex-col">
              <div class="d-flex">
              </div>
              <el-input
                maxlength="255"
                :placeholder="placeholder.furi_last_name"
                @focus="resetValidate('furi_last_name')"
                v-model.trim="accountForm.furi_last_name"
              />
            </div>
          </el-form-item>
        </div>
        <el-form-item prop="company_name" :error="(error.key === 'company_name') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">{{ $t('career.company_name') }}</div>
            <el-input
              @focus="resetValidate('company_name')"
              maxlength="255"
              :placeholder="$t('career.company_name')"
              v-model.trim="accountForm.company_name"
            />
          </div>
        </el-form-item>
        <el-form-item prop="home_page_recruiter" :error="(error.key === 'home_page_recruiter') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">{{ $t('page.home') }}</div>
            <el-input
              maxlength="255"
              @focus="resetValidate('home_page_recruiter')"
              v-model.trim="accountForm.home_page_recruiter"
              :placeholder="$t('page.home')"
            />
          </div>
        </el-form-item>
        <el-form-item prop="tel" :error="(error.key === 'tel') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp d-flex items-center">
              <span class="sub-title-sp">{{ $t('my_page.phone') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <el-input
              name="tel"
              @input="phoneInput"
              @focus="resetValidate('tel')"
              tabindex="2"
              pattern="[0-9]*"
              style="width: 50%"
              placeholder="000-1230-0001"
              v-model.trim="accountForm.tel"
            />
          </div>
        </el-form-item>
        <el-form-item prop="postal_code" :error="(error.key === 'postal_code') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp d-flex items-center">
              <span class="sub-title-sp">{{ $t('my_page.post_code') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <el-input
              pattern="[0-9]*"
              @change="handleChange"
              @focus="resetValidate('postal_code')"
              @input="zipCodeInput"
              placeholder="000-0000"
              style="width: 50%"
              v-model.trim="accountForm.postal_code"
            />
          </div>
        </el-form-item>
        <div class="edit-col-sp gap-10">
          <div class="edit-title-sp d-flex flex-col">
            <div class="d-flex">
              <span class="sub-title-sp">{{ $t('my_page.prefectures') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <el-form-item prop="province_id" :error="(error.key === 'province_id') ? error.value : ''">
              <el-select
                v-model="accountForm.province_id"
                @change="selectCity"
                @focus="resetValidate('province_id')"
                @blur="validate('province_id')"
                :placeholder="$t('common.select')"
              >
                <el-option v-for="item in listProvinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          </div>
          <div class="edit-title-sp d-flex flex-col">
            <div class="d-flex">
              <span class="sub-title-sp">{{ $t('my_page.municipalities') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <el-form-item prop="province_city_id" :error="(error.key === 'province_city_id') ? error.value : ''">
              <el-select
                v-model="accountForm.province_city_id"
                @change="selectCity"
                @focus="resetValidate('province_city_id')"
                @blur="validate('province_city_id')"
                :placeholder="$t('common.select')"
              >
                <el-option v-for="item in listProvinceCity" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="edit-col-sp gap-10">
          <el-form-item prop="address" :error="(error.key === 'address') ? error.value : ''">
            <div class="edit-title-sp d-flex flex-col">
              <div class="d-flex">
                <span class="sub-title-sp">{{ $t('my_page.address2') }}</span>
                <div class="required-field">{{ $t('form.required') }}</div>
              </div>
              <el-input
                  maxlength="255"
                  :placeholder="placeholder.address"
                  @focus="resetValidate('address')"
                  v-model.trim="accountForm.address"
              />
            </div>
          </el-form-item>
          <el-form-item prop="building" :error="(error.key === 'building') ? error.value : ''">
            <div class="edit-title-sp d-flex flex-col">
              <div class="d-flex">
                <span class="sub-title-sp">{{ $t('my_page.building_name') }}</span>
                <div class="required-field v-hidden">{{ $t('form.required') }}</div>
              </div>
              <el-input
                maxlength="255"
                :placeholder="placeholder.building"
                @focus="resetValidate('building')"
                v-model.trim="accountForm.building"
              />
            </div>
          </el-form-item>
        </div>
        <el-form-item prop="alias_name" :error="(error.key === 'alias_name') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">{{ $t('my_page.representative_name') }}</div>
            <el-input
              maxlength="255"
              @focus="resetValidate('alias_name')"
              :placeholder="$t('my_page.representative_name')"
              v-model.trim="accountForm.alias_name"
            />
          </div>
        </el-form-item>
        <el-form-item prop="employee_quantity" :error="(error.key === 'employee_quantity') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">{{ $t('my_page.number_of_employees') }}</div>
            <el-input
              maxlength="255"
              :placeholder="$t('my_page.number_of_employees')"
              @focus="resetValidate('employee_quantity')"
              v-model.trim="accountForm.employee_quantity"
            />
          </div>
        </el-form-item>
        <div class="edit-col-sp flex-col">
          <div class="edit-title-sp">{{ $t('my_page.establish') }}</div>
          <el-form-item prop="establish" :error="(error.key === 'establish') ? error.value : ''">
            <div class="d-flex">
              <div class="d-flex items-center">
                  <el-select
                    @blur="validate('establish')"
                    @focus="resetValidate('establish')"
                    v-model="accountForm.year"
                    style="width: 80px"
                    class="select-datetime"
                    placeholder="YYYY"
                  >
                    <el-option v-for="item in linksYear" :key="item.value" :label="item.value" :value="item.value">
                    </el-option>
                  </el-select>
                <span class="time-text">{{ $t('form.year') }}</span>
              </div>
              <div class="d-flex items-center">
                  <el-select
                    @blur="validate('establish')"
                    @focus="resetValidate('establish')"
                    v-model="accountForm.month"
                    style="width: 80px"
                    class="select-datetime"
                    placeholder="MM"
                  >
                    <el-option v-for="item in linksMonth" :key="item.value" :label="item.value" :value="item.value">
                    </el-option>
                  </el-select>
                <span class="time-text">{{ $t('form.month') }}</span>
              </div>
            </div>
          </el-form-item>
        </div>
        <el-form-item prop="capital_stock" :error="(error.key === 'capital_stock') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">{{ $t('my_page.capital') }}</div>
            <el-input
              maxlength="255"
              :placeholder="$t('my_page.capital')"
              v-model.trim="accountForm.capital_stock"
              @focus="resetValidate('capital_stock')"
            />
          </div>
        </el-form-item>
        <el-form-item prop="manager_name" :error="(error.key === 'manager_name') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">{{ $t('my_page.manager') }}</div>
            <el-input
              maxlength="255"
              :placeholder="$t('my_page.manager')"
              v-model.trim="accountForm.manager_name"
              @focus="resetValidate('manager_name')"
            />
          </div>
        </el-form-item>
        <el-form-item prop="line" :error="(error.key === 'manager_name') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">LINE ID</div>
            <el-input
              maxlength="255"
              :placeholder="placeholder.line"
              v-model.trim="accountForm.line"
              @focus="resetValidate('line')"
            />
          </div>
        </el-form-item>
        <el-form-item prop="facebook" :error="(error.key === 'facebook') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">Facebook</div>
            <el-input
              maxlength="255"
              :placeholder="placeholder.facebook"
              v-model.trim="accountForm.facebook"
              @focus="resetValidate('facebook')"
            />
          </div>
        </el-form-item>
        <el-form-item prop="instagram" :error="(error.key === 'instagram') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">Instagram</div>
            <el-input
              maxlength="255"
              :placeholder="placeholder.instagram"
              v-model.trim="accountForm.instagram"
              @focus="resetValidate('instagram')"
            />
          </div>
        </el-form-item>
        <el-form-item prop="twitter" :error="(error.key === 'twitter') ? error.value : ''">
          <div class="edit-col-sp flex-col">
            <div class="edit-title-sp">Twitter</div>
            <el-input
              maxlength="255"
              :placeholder="placeholder.twitter"
              v-model.trim="accountForm.twitter"
              @focus="resetValidate('twitter')"
            />
          </div>
        </el-form-item>
        <div class="edit-col-sp flex-col">
          <div class="edit-title-sp">{{ $t('my_page.usage_status') }}</div>
          <el-input :placeholder="$t('my_page.usage_status')" disabled></el-input>
        </div>
        <div class="edit-button">
          <el-button type="danger" @click="update">{{ $t('my_page.save') }}</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS,
  INDEX_SET_ERROR,
  USER_UPDATE_PROFILE,
  USER_PROFILE,
  MASTER_GET_DATA,
  GET_ZIP_CODE,
  SET_STATE_MENU,
  INDEX_SET_TITLE_MENU
} from '../store/store.const'
import { validHalfWidth, validFullWidthKana } from '../utils/validate'
import { LINKS_MONTH } from '@/constants/store'

export default {
  name: 'EditInformation',
  data() {
    const validFormLength = (rule, value, callback, message) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validFullWidthKanaLength = (rule, value, callback, message) => {
      if (!validFullWidthKana(value)) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validPhone = (rule, value, callback) => {
      if (value && (value.length < 12 || !value.startsWith(0))) {
        callback(new Error(this.$t('validation.phone_length', { _field_: this.$t('my_page.phone') })))
      } else {
        callback()
      }
    }
    const validHalfWidthLength = (rule, value, callback, message) => {
      if (value && !validHalfWidth(value)) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validPostCode = (rule, value, callback) => {
      if (value && value.length < 8) {
        callback(new Error(this.$t('validation.postcode_length', { _field_: this.$t('my_page.post_code') })))
      } else {
        callback()
      }
    }
    const validDate = (rule, value, callback) => {
      const chooseDate = new Date(`${this.accountForm.year}-${this.accountForm.month}`)
      if (chooseDate > new Date()) {
        callback(new Error(this.$t('content.ERR_042')))
      } else {
        callback()
      }
    }
    return {
      accountForm: {
        store_name: '',
        first_name: '',
        last_name: '',
        furi_first_name: '',
        furi_last_name: '',
        company_name: '',
        home_page_recruiter: '',
        tel: '',
        line: '',
        instagram: '',
        facebook: '',
        twitter: '',
        address: '',
        building: '',
        alias_name: '',
        manager_name: '',
        capital_stock: '',
        employee_quantity: '',
        postal_code: '',
        month: '',
        year: '',
        province_id: '',
        province_city_id: '',
        errors: {}
      },
      placeholder: {
        website: 'www.beautysalon.com',
        address: '例）一丁目二番',
        building: '例）マンション101号',
        line: 'line.me/ti/p/z73demo',
        facebook: 'facebook.com/example',
        instagram: 'instagram.com/example',
        twitter: 'twitter.com/example'
      },
      error: {
        key: null,
        value: ''
      },
      accountRules: {
        first_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('information.first_name') }), trigger: 'blur' },
          { required: true, message: this.$t('validation.required', { _field_: this.$t('information.first_name') }), trigger: 'blur' }
        ],
        last_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('information.last_name') }), trigger: 'blur' },
          { required: true, message: this.$t('validation.required', { _field_: this.$t('information.last_name') }), trigger: 'blur' }
        ],
        furi_first_name: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('information.furi_first_name') }), trigger: 'blur' },
          { validator: validFullWidthKanaLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('information.furi_first_name') }), trigger: 'blur' }
        ],
        furi_last_name: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('information.furi_last_name') }), trigger: 'blur' },
          { validator: validFullWidthKanaLength, message: this.$t('validation.fullwidth_length', { _field_: this.$t('information.furi_last_name') }), trigger: 'blur' }
        ],
        establish: [
          { validator: validDate, trigger: 'change' }
        ],
        company_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('career.company_name') }), trigger: 'blur' }
        ],
        home_page_recruiter: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('page.home') }), trigger: 'blur' },
          { validator: validHalfWidthLength, message: this.$t('validation.com003', { _field_: this.$t('page.home') }), trigger: 'blur' }
        ],
        tel: [
          { required: true, message: this.$t('validation.required', { _field_: this.$t('my_page.phone') }), trigger: 'blur' },
          { validator: validPhone, trigger: 'blur' }
        ],
        province_id: [
          { required: true, message: this.$t('validation.required_select', { _field_: this.$t('my_page.prefectures') }), trigger: 'blur' }
        ],
        province_city_id: [
          { required: true, message: this.$t('validation.required_select', { _field_: this.$t('my_page.municipalities') }), trigger: 'blur' }
        ],
        address: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.address2') }), trigger: 'blur' },
          { required: true, message: this.$t('validation.required', { _field_: this.$t('my_page.address2') }), trigger: 'blur' }
        ],
        building: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.building_name') }), trigger: 'blur' }
        ],
        alias_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.representative_name') }), trigger: 'blur' }
        ],
        capital_stock: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.capital') }), trigger: 'blur' }
        ],
        employee_quantity: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.number_of_employees') }), trigger: 'blur' }
        ],
        manager_name: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.manager') }), trigger: 'blur' }
        ],
        line: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: 'Line ID' }), trigger: 'blur' },
          { validator: validHalfWidthLength, message: this.$t('validation.com003', { _field_: 'Line ID' }), trigger: 'blur' }
        ],
        facebook: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: 'Facebook' }), trigger: 'blur' },
          { validator: validHalfWidthLength, message: this.$t('validation.com003', { _field_: 'Facebook' }), trigger: 'blur' }
        ],
        instagram: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: 'Instagram' }), trigger: 'blur' },
          { validator: validHalfWidthLength, message: this.$t('validation.com003', { _field_: 'Instagram' }), trigger: 'blur' }
        ],
        twitter: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: 'Twitter' }), trigger: 'blur' },
          { validator: validHalfWidthLength, message: this.$t('validation.com003', { _field_: 'Twitter' }), trigger: 'blur' }
        ],
        postal_code: [
          { validator: validPostCode, message: this.$t('validation.postcode_length', { _field_: this.$t('my_page.post_code') }), trigger: 'change' }
        ]
      },
      listProvinceDistrict: [],
      listProvinces: [],
      listProvinceCity: [],
      linksYear: [],
      linksMonth: [],
      clonedZipCode: '',
      clonedAccountForm: {}
    }
  },
  watch: {
    listProvinces() {
      this.listProvinceCity = this.accountForm.province_id ? this.listProvinces[this.accountForm.province_id].province_city : ''
    },
    'accountForm.province_city_id'() {
      if (this.accountForm.province_id) {
        this.resetValidate('province_city_id')
        this.resetValidate('province_id')
      }
    }
  },
  async created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('page.my_page'), subTitle: 'My page' })
    await this.getProvinceMaster()
    await this.getInfo()
    this.clonedAccountForm = _.cloneDeep(this.accountForm)
  },
  methods: {
    async getInfo() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const data = await this.$store.dispatch(USER_PROFILE)
        const dataApi = data.data[0]
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            this.accountForm.furi_first_name = dataApi.furi_first_name
            this.accountForm.furi_last_name = dataApi.furi_last_name
            this.accountForm.first_name = dataApi.first_name
            this.accountForm.last_name = dataApi.last_name
            this.accountForm.year = dataApi.date.year || '2000'
            this.accountForm.month = dataApi.date.month || '01'
            this.accountForm.postal_code = this.zipCodeFormat(dataApi.address_information.postal_code)
            this.clonedZipCode = this.zipCodeFormat(dataApi.address_information.postal_code)
            this.accountForm.capital_stock = dataApi.capital_stock
            this.accountForm.employee_quantity = dataApi.employee_quantity
            this.accountForm.address = dataApi.address_information.address
            this.accountForm.building = dataApi.address_information.building
            this.accountForm.manager_name = dataApi.manager_name
            this.accountForm.alias_name = dataApi.alias_name
            this.accountForm.line = dataApi.line_id
            this.accountForm.facebook = dataApi.facebook
            this.accountForm.instagram = dataApi.instagram
            this.accountForm.twitter = dataApi.twitter
            this.accountForm.tel = this.phoneFormat(dataApi.tel)
            this.accountForm.company_name = dataApi.company_name
            this.accountForm.home_page_recruiter = dataApi.home_page_recruiter
            this.accountForm.store_name = dataApi.store_name.join('、')
            this.accountForm.province_id = dataApi.address_information.province_id
            this.accountForm.province_city_id = dataApi.address_information.province_city_id
            break
          case 401:
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
            this.$auth.logout()
            break
          case 422:
            for (const [key] of Object.entries(data.data)) {
              this.error = { key, value: data.data[key][0] }
            }
            break
          case 500:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: this.$t('content.EXC_001')
            })
            break
          default:
            this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
            break
        }
      } catch {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    blurPostCode() {
      if (!_.isEqual(this.clonedZipCode, this.accountForm.postal_code)) {
        this.getZipCode()
      } else this.error = { key: null, value: '' }
    },
    focusPostCode() {
      this.error = { key: 'postal_code', value: '' }
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      this.$refs.accountForm.fields.find((f) => f.prop === ref).clearValidate()
      this.accountForm.errors[ref] = ''
    },
    validate(ref) {
      this.$refs.accountForm.validateField(ref)
    },
    handleChange(value) {
      this.accountForm.postal_code = value
      this.getZipCode()
    },
    async getZipCode() {
      const postalCode = this.accountForm.postal_code.replace(/-/g, '')
      if (!postalCode) {
        this.error = { key: null, value: '' }
      } else {
        try {
          await this.$store.commit(INDEX_SET_LOADING, true)
          const { data } = await this.$store.dispatch(GET_ZIP_CODE, postalCode)
          if (data.province_id) {
            this.accountForm.province_id = data.province_id
            this.listProvinceCity = this.listProvinces[data.province_id].province_city
            this.accountForm.province_city_id = data.province_city_id
            this.accountForm.address = data.address
            this.error = { key: null, value: '' }
          } else {
            this.error = { key: 'postal_code', value: this.$t('validation.com015', { _field_: this.$t('my_page.post_code') }) }
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        } catch (err) {
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      }
    },
    getProvinceMaster() {
      const dataResources = [
        'resources[province_districts]={}'
      ]
      this.$store.dispatch(MASTER_GET_DATA, dataResources).then(res => {
        this.listProvinceDistrict = res.data.province_districts
        const listCity = {}
        this.listProvinceDistrict.forEach((district) => {
          district.provinces.forEach((provinces) => {
            listCity[provinces.id] = provinces
          })
        })
        this.listProvinces = listCity
      })
    },
    phoneInput() {
      const x = this.accountForm.tel.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})(\d{0,4})/)
      this.accountForm.tel = !x[2] ? x[1] : '' + x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '')
    },
    zipCodeInput() {
      const x = this.accountForm.postal_code.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})/)
      this.accountForm.postal_code = !x[2] ? x[1] : '' + x[1] + '-' + x[2]
    },
    zipCodeFormat(zip) {
      return zip ? zip.toString().slice(0, 3) + '-' + zip.toString().slice(3) : ''
    },
    selectCity(value) {
      if (this.accountForm.province_id) {
        this.listProvinceCity = this.listProvinces[value].province_city
      } else {
        this.listProvinceCity = []
      }
      this.accountForm.province_city_id = ''
      this.validate('province_id')
    },
    loadAllYear() {
      for (let i = new Date().getFullYear(); i >= 1970; i--) {
        this.linksYear.push({ value: i.toString() })
      }
    },
    loadAllMonth() {
      this.linksMonth = LINKS_MONTH
    },
    scrollToElement(key) {
      const el = this.$refs[key]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    phoneFormat(num) {
      if (num) {
        const format = num.toString().replace(/-/g, '')
        return format.toString().slice(0, 3) + '-' + format.toString().slice(3, 7) + '-' + format.toString().slice(7, 12)
      }
      return ''
    },
    update() {
      if (this.error.key === 'postal_code') {
        this.scrollToElement('postal_code')
        return
      }
      this.$refs.accountForm.validate(async(valid, key) => {
        if (valid) {
          try {
            await this.$store.commit(INDEX_SET_LOADING, true)
            const dto = {
              ...this.accountForm,
              postal_code: this.accountForm.postal_code ? this.accountForm.postal_code.replace(/[^0-9]/g, '') : '',
              founded_year: `${this.accountForm.year}/${this.accountForm.month}`
            }
            const response = await this.$store.dispatch(USER_UPDATE_PROFILE, dto)
            switch (response.status_code) {
              case 200:
                await this.$store.commit(INDEX_SET_SUCCESS, {
                  show: true,
                  text: response.messages
                })
                this.accountForm = this.clonedAccountForm
                await this.$auth.fetchUser()
                await this.$router.push('/basic-information')
                break
              case 401:
                await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
                this.$auth.logout()
                break
              case 422:
                for (const [key] of Object.entries(response.data)) {
                  this.error = { key, value: response.data[key][0] }
                }
                break
              case 500:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: this.$t('content.EXC_001')
                })
                break
              default:
                await this.$store.commit(INDEX_SET_ERROR, {
                  show: true,
                  text: response.messages
                })
                break
            }
            await this.$store.commit(INDEX_SET_LOADING, false)
          } catch (err) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
          }
          await this.$store.commit(INDEX_SET_LOADING, false)
        } else {
          this.scrollToElement(Object.keys(key)[0])
        }
      })
    },
    changeSelect(val, key) {
      if (!val) {
        this.validate(key)
      }
    }
  },
  mounted() {
    this.loadAllYear()
    this.loadAllMonth()
  },
  async beforeRouteLeave(to, from, next) {
    const dataClone = this.clonedAccountForm
    const data = _.cloneDeep(this.accountForm)
    dataClone.errors = {}
    data.errors = {}
    if (!_.isEqual(data, dataClone)) {
      this.$confirm(this.$t('content.CON_002'), {
        confirmButtonText: this.$t('confirm_modal.yes'),
        cancelButtonText: this.$t('confirm_modal.no'),
        type: 'warning'
      })
        .then(function() {
          next()
        })
        .catch(function() {
          next(false)
        })
      await this.$store.commit(SET_STATE_MENU, !this.stateMenu)
    } else {
      next()
    }
  }
}
</script>
