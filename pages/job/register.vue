<template>
  <div class="register-job main-job-container">
    <el-form ref="jobForm" :model="jobForm" :rules="jobRules" autocomplete="off" label-position="left">
      <div class="breadcrumb-box d-flex job-title-pc">
        <span class="breadcrumb-previous" @click="$router.push('/')">{{ $t('my_page.top_page') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-previous" @click="$router.push('/list-job')">{{ $t('my_page.job_list') }}</span>
        <img class="breadcrumb-arrow" src="../../assets/icons/breadcrumb-arrow.svg" />
        <span class="breadcrumb-current">{{ $t('my_page.register_job') }}</span>
      </div>
      <div @click="$router.push('/list-job')" class="job-title-sp d-flex items-center cursor-pointer">
        <img src="~/assets/icons/prev_mobile.svg" />
        <span class="breadcrumb-current">{{ $t('my_page.register_job') }}</span>
      </div>
      <div class="register-job__body">
        <div class="register-job__header">{{ $t('my_page.job_summary') }}</div>
        <div class="register-job__table">
          <div class="register-job__col">
            <div class="register-job__left d-flex justify-between items-center">
              <span>{{ $t('my_page.job_title') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="name" class="register-job__right items-center">
              <el-form-item label="" prop="name" :error="(error.key === 'name') ? error.value : ''">
                <el-input
                  name="name" type="text" tabindex="2" maxlength="255"
                  @focus="resetValidate('name')" class=" " v-model="jobForm.name"
                  :placeholder="$t('my_page.job_title')"
                />
              </el-form-item>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left d-flex justify-between items-center">
              <span>{{ $t('career.store_name') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="store_id" class="register-job__right items-center">
              <el-form-item label="" prop="store_id" :error="(error.key === 'store_id') ? error.value : ''">
                <el-select
                  :disabled="store_id ? true : false"
                  class="resize-width select-wide"
                  v-model="jobForm.store_id"
                  :placeholder="$t('job_list.enter_place')"
                  @change="validate('store_id')"
                  @focus="resetValidate('store_id')"
                  @visible-change="(event) => { checkValidate('store_id', event) }"
                >
                  <div v-if="storeNameOptions.length === 0">
                    <el-option :label="$t('job_list.enter_place')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                  </div>
                  <el-option v-for="item in storeNameOptions" :key="item.id" :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left register-job__text">
              <div class="basic-tab__pc"><span>{{ $t('my_page.pick_up_point_top') }}</span><br><span>{{ $t('my_page.pick_up_point_bottom') }}</span></div>
              <div class="basic-tab__sp"><span>{{ $t('my_page.pick_up_point') }}</span></div>
            </div>
            <div ref="pick_up_point" class="register-job__right d-flex flex-col">
              <el-form-item label="" prop="pick_up_point" :error="(error.key === 'pick_up_point') ? error.value : ''">
                <el-input class="input-textarea" type="textarea" :rows="3" v-model="jobForm.pick_up_point" maxlength="2000"
                          :placeholder="$t('my_page.pick_up_point')" @focus="resetValidate('pick_up_point')"/>
              </el-form-item>
              <div class="register-job__description">{{ $t('common.limit_characters', { current: showLengthTextarea(jobForm.pick_up_point), max: 2000 }) }}</div>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left  d-flex justify-between">
              <span>{{ $t('my_page.main_image') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="job_banner" class="register-right flex-col ">
              <el-form-item label="" prop="job_banner" :error="(error.key === 'job_banner') ? error.value : ''">
                <div class="show-avatar">
                  <div class="button-upload">
                    <el-button class="upload-button"><label for="upload-avatar">{{ $t('my_page.select_file') }}</label></el-button>
                    <div slot="tip" class="register-job__description">{{ $t('my_page.file_limit') }}</div>
                  </div>
                  <div v-if="imageAvatarShow" class="show-detail">
                    <div v-if="imageAvatarShow" id="img-avatar" class="show-image">
                      <el-image
                        :src="imageAvatarShow"
                        :preview-src-list="[imageAvatarShow]">
                      </el-image>
                    </div>
                    <img class="image-close" src="/assets/icon/icon_close_image.svg" alt="" @click="removeAvatar">
                  </div>
                  <input id="upload-avatar" ref="fileUploadAvatar" class="d-none" type="file" @change="onFileChange" accept=".jpeg, .jpg, .png, .svg">
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left  d-flex justify-between">
              <span>{{ $t('my_page.sub_image') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="job_thumbnails" class="register-right flex-col ">
              <el-form-item label="" prop="job_thumbnails" :error="(error.key === 'job_thumbnails') ? error.value : ''">
                <input id="upload-detail" ref="fileUploadDetail" :class="{'disabledImg' : disableImgUp}" class="d-none" type="file" max="3" multiple @change="onFileChangeDetail" accept=".jpeg, .jpg, .png, .svg">
                <div class="button-upload">
                  <el-button class="upload-button" :disabled="disableImgUp">
                    <label v-if="disableImgUp" class="cursor-not-allowed">{{ $t('my_page.select_file') }}</label>
                    <label v-else for="upload-detail">{{ $t('my_page.select_file') }}</label>
                  </el-button>
                  <div slot="tip" class="register-job__description show_sub_image_des_pc">{{ $t('my_page.sub_image_des') }}</div>
                  <div slot="tip" class="register-job__description show_sub_image_des_sp">{{ $t('my_page.sub_image_des_1') }}<br>{{ $t('my_page.sub_image_des_2') }}</div>
                </div>
                <div v-if="imageDetailShow.length" class="d-flex show-img-detail">
                  <div v-for="(detail, index) in imageDetailShow" :key="index" class="show-detail">
                    <div v-if="detail" class="sub-image">
                      <el-image
                        :src="detail"
                        :preview-src-list="[detail]">
                      </el-image>
                    </div>
                    <img class="image-close" src="/assets/icon/icon_close_image.svg" alt="" @click="removeImage(index)">
                  </div>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="register-job__header">{{ $t('job.application_requirement') }}</div>
        <div class="register-job__table">
          <div class="register-job__col">
            <div class="register-job__left d-flex justify-between items-center">
              <span>{{ $t('job.recruitment_type') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="job_type_ids" class="register-job__right select-job-type d-flex items-center">
              <el-form-item label="" prop="job_type_ids" :error="(error.key === 'job_type_ids') ? error.value : ''">
                <el-select
                  class="select-wide resize-width"
                  v-model="jobForm.job_type_ids"
                  multiple
                  :placeholder="$t('job_list.enter_place')"
                  @change="validate('job_type_ids')"
                  @focus="resetValidate('job_type_ids')"
                  @visible-change="(event) => { checkValidate('job_type_ids', event) }"
                >
                  <div v-if="listJobTypes.length === 0">
                    <el-option :label="$t('job_list.enter_place')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                  </div>
                  <el-option v-for="item in listJobTypes" :key="item.id" :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left d-flex justify-between ">
              <span>{{ $t('favorite_job.description') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="description" class="register-job__right d-flex flex-col">
              <el-form-item label="" prop="description"
                            :error="(error.key === 'description') ? error.value : ''">
                <el-input class="input-textarea" tabindex="2" maxlength="2000" @focus="resetValidate('description')"
                          type="textarea" :rows="3" v-model="jobForm.description"
                          :placeholder="$t('favorite_job.description')" />
              </el-form-item>
              <div class="register-job__description">{{ $t('common.limit_characters', { current: showLengthTextarea(jobForm.description), max: 2000 }) }}</div>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left d-flex justify-between ">
              <span>{{ $t('job.employment_status') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="work_type_ids" class="register-job__right d-flex items-center">
              <div class="register-job__checkbox">
                <el-form-item label="" prop="work_type_ids" :error="(error.key === 'work_type_ids') ? error.value : ''">
                  <el-checkbox-group v-model="jobForm.work_type_ids">
                    <el-checkbox v-for="item in listWorkTypes" :key="item.id" :label="item.id" :value="item.id">{{ item.name }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left d-flex justify-between ">
              <span>{{ $t('job.salary') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div class="register-job__right">
                <div ref="salary_type_id" class="register-job__salary">
                  <el-form-item label="" prop="salary_type_id" :error="(error.key === 'salary_type_id') ? error.value : ''">
                    <el-select
                      class="w-150 salary-type resize-width"
                      v-model="jobForm.salary_type_id"
                      :placeholder="$t('job_list.enter_place')"
                      @change="validate('salary_type_id')"
                      @focus="resetValidate('salary_type_id')"
                      @visible-change="(event) => { checkValidate('salary_type_id', event) }"
                    >
                      <div v-if="listSalaryTypes.length === 0">
                        <el-option :label="$t('job_list.enter_place')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                      </div>
                      <el-option v-for="item in listSalaryTypes" :key="item.id" :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :error="errors.salary_min_max">
                    <div class="form-min-max">
                      <el-form-item class="w-120 resize-width" label="" prop="salary_min" :error="(error.key === 'salary_min') ? error.value : ''">
                        <el-input v-model="jobForm.salary_min" maxlength="8" :placeholder="$t('job_list.enter_place')" @focus="resetValidate('salary_min')" @change="checkMinMax"/>
                      </el-form-item>
                      <span class="salary-range">～</span>
                      <el-form-item class="w-120 resize-width" label="" prop="salary_max" :error="(error.key === 'salary_max') ? error.value : ''">
                        <el-input v-model="jobForm.salary_max" maxlength="8" :placeholder="$t('job_list.enter_place')" @focus="resetValidate('salary_max')" @change="checkMinMax"/>
                      </el-form-item>
                    </div>
                  </el-form-item>
                </div>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left ">{{ $t('my_page.salary_details') }}</div>
            <div ref="salary_description" class="register-job__right d-flex flex-col">
              <el-form-item label="" prop="salary_description"
                            :error="(error.key === 'salary_description') ? error.value : ''">
                <el-input class="input-textarea" type="textarea" maxlength="2000" :rows="3" v-model="jobForm.salary_description" @focus="resetValidate('salary_description')"
                          :placeholder="$t('my_page.salary_details')" />
              </el-form-item>
              <div class="register-job__description">{{ $t('common.limit_characters', { current: showLengthTextarea(jobForm.salary_description), max: 2000 }) }}</div>
            </div>
          </div>
          <div class="register-job__col form-workday">
            <div class="register-job__left d-flex justify-between ">
              <span>{{ $t('job.work_day') }}</span>
            </div>
            <div class="register-job__right d-flex items-center">
              <div class="register-job__checkbox">
                <el-form-item label="" prop="working_days" :error="(error.key === 'working_days') ? error.value : ''">
                  <el-checkbox-group v-model="jobForm.working_days">
                    <el-checkbox v-for="work_type in listWorkDay" :key="work_type.id" :value="work_type.id" :label="work_type.id">{{ work_type.name }}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left d-flex justify-between ">
              <span>{{ $t('favorite_job.working_hours') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div class="register-job__right">
              <el-form-item :error="errors.start_end_time">
                <div class="register-job__hours" ref="end_work_time">
                  <div ref="start_work_time">
                    <el-select
                      class="w-150 salary-type"
                      v-model="jobForm.range_hours_type"
                      :placeholder="$t('job_list.enter_place')"
                    >
                      <div v-if="listHourTypes.length === 0">
                        <el-option :label="$t('job_list.enter_place')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                      </div>
                      <el-option v-for="item in listHourTypes" :key="item.id" :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                  <div v-if="jobForm.range_hours_type === 2">
                    <div class="d-flex hours-layout">
                      <div class="select-morning">
                        <el-select
                          class="salary-type resize-width"
                          v-model="jobForm.start_work_time_type"
                          :placeholder="$t('job_list.enter_place')"
                        >
                          <div v-if="listMorning.length === 0">
                            <el-option :label="$t('job_list.enter_place')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                          </div>
                          <el-option v-for="item in listMorning" :key="item.id" :label="item.name"
                                     :value="item.id">
                          </el-option>
                        </el-select>
                      </div>
                      <span class="hour-text">{{ $t('my_page.start_time') }}</span>
                      <div class="d-flex items-center">
                        <el-form-item class="w-80 resize-width" label="" prop="start_work_time" :error="(error.key === 'start_work_time') ? error.value : ''">
                          <el-select
                            v-model="startHour"
                            :placeholder="$t('job_list.enter_place')"
                            @focus="resetValidate('start_work_time')"
                            @visible-change="(val) => { checkValidate('start_work_time', val) }"
                            @change="changeMinute('startMinute')"
                          >
                            <el-option
                              v-for="item in linksHours"
                              :key="item.value"
                              :label="item.value"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          <span class="colon">:</span>
                          <el-select
                            class="w-80 resize-width"
                            v-model="startMinute"
                            :placeholder="$t('job_list.enter_place')"
                            @focus="resetValidate('start_work_time')"
                            @visible-change="(val) => { checkValidate('start_work_time', val) }"
                          >
                            <el-option
                              v-for="item in linksMinutes"
                              :key="item.value"
                              :label="item.value"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div :class="['icon-between-hour', (jobForm.range_hours_type === 2) ? '' : 'icon-between-hour-24']"><div>～</div></div>
                    <div class="d-flex hours-layout">
                      <div class="select-morning">
                        <el-select
                          class="w-150 salary-type resize-width"
                          v-model="jobForm.end_work_time_type"
                          :placeholder="$t('job_list.enter_place')"
                        >
                          <div v-if="listMorning.length === 0">
                            <el-option :label="$t('job_list.enter_place')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                          </div>
                          <el-option v-for="item in listMorning" :key="item.id" :label="item.name"
                                     :value="item.id">
                          </el-option>
                        </el-select>
                      </div>
                      <span class="hour-text">{{ $t('my_page.end_time') }}</span>
                      <div class="d-flex items-center">
                        <el-form-item label="" prop="end_work_time" :error="(error.key === 'end_work_time') ? error.value : ''">
                          <el-select
                            class="w-80 resize-width"
                            v-model="endHour"
                            :placeholder="$t('job_list.enter_place')"
                            @focus="resetValidate('end_work_time')"
                            @change="changeMinute('endMinute')"
                            @visible-change="(val) => { checkValidate('end_work_time', val) }">
                            <el-option
                              v-for="item in linksHours"
                              :key="item.value"
                              :label="item.value"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          <span class="colon">:</span>
                          <el-select
                            class="w-80 resize-width"
                            v-model="endMinute"
                            :placeholder="$t('job_list.enter_place')"
                            @focus="resetValidate('end_work_time')"
                            @visible-change="(val) => { checkValidate('end_work_time', val) }"
                          >
                            <el-option
                              v-for="item in linksMinutes"
                              :key="item.value"
                              :label="item.value"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                  <div v-else class="d-flex hours-first-type">
                    <div class="d-flex hours-layout">
                      <span class="hour-text">{{ $t('my_page.start_time') }}</span>
                      <div class="d-flex">
                        <el-form-item class="w-80 resize-width" label="" prop="start_work_time" :error="(error.key === 'start_work_time') ? error.value : ''">
                          <el-select
                            v-model="startHour"
                            :placeholder="$t('job_list.enter_place')"
                            @focus="resetValidate('start_work_time')"
                            @change="changeMinute('startMinute')"
                            @visible-change="(val) => { checkValidate('start_work_time', val) }"
                          >
                            <el-option
                              v-for="item in linksHours"
                              :key="item.value"
                              :label="item.value"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          <span class="colon">:</span>
                          <el-select
                            class="w-80 resize-width"
                            v-model="startMinute"
                            :placeholder="$t('job_list.enter_place')"
                            @focus="resetValidate('start_work_time')"
                            @visible-change="(val) => { checkValidate('start_work_time', val) }"
                          >
                            <el-option
                              v-for="item in linksMinutes"
                              :key="item.value"
                              :label="item.value"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <span class="text-start-end"><div>～</div></span>
                    <div class="d-flex hours-layout">
                      <span class="hour-text">{{ $t('my_page.end_time') }}</span>
                      <div class="d-flex">
                        <el-form-item label="" prop="end_work_time" :error="(error.key === 'end_work_time') ? error.value : ''">
                          <el-select
                            class="w-80 resize-width"
                            v-model="endHour"
                            :placeholder="$t('job_list.enter_place')"
                            @focus="resetValidate('end_work_time')"
                            @change="changeMinute('endMinute')"
                            @visible-change="(val) => { checkValidate('end_work_time', val) }">
                            <el-option
                              v-for="item in linksHours"
                              :key="item.value"
                              :label="item.value"
                              :value="item.value">
                            </el-option>
                          </el-select>
                          <span class="colon">:</span>
                          <el-select
                            class="w-80 resize-width"
                            v-model="endMinute"
                            :placeholder="$t('job_list.enter_place')"
                            @focus="resetValidate('end_work_time')"
                            @visible-change="(val) => { checkValidate('end_work_time', val) }"
                          >
                            <el-option
                              v-for="item in linksMinutes"
                              :key="item.value"
                              :label="item.value"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left ">{{ $t('my_page.working_hours_detail') }}</div>
            <div class="register-job__right d-flex flex-col">
              <el-form-item class="resize-width" label="" prop="shifts" :error="(error.key === 'shifts') ? error.value : ''">
                <el-input class="input-textarea" type="textarea" :rows="3" v-model="jobForm.shifts" maxlength="2000"
                          :placeholder="$t('my_page.working_hours_detail')" @focus="resetValidate('shifts')"/>
              </el-form-item>
              <div class="register-job__description">{{ $t('common.limit_characters', { current: showLengthTextarea(jobForm.shifts), max: 2000 }) }}</div>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left ">{{ $t('my_page.age') }}</div>
            <div class="register-job__right">
              <el-form-item label="" prop="age_min_max" :error="errors.age_min_max">
                <div class="register-job__age">
                  <div class="job-age">
                    <el-form-item class="w-130 resize-width" label="" prop="age_min" :error="(error.key === 'age_min') ? error.value : ''">
                      <el-input
                        v-model="jobForm.age_min"
                        :placeholder="$t('common.select')"
                        maxlength="3"
                        @focus="resetValidate('age_min')"
                        @blur="checkAgeMinMax"
                      />
                    </el-form-item>
                    <span class="age-text">{{ $t('my_page.over_age') }}</span>
                  </div>
                  <div class="job-age">
                    <el-form-item class="w-130 resize-width" label="" prop="age_max" :error="(error.key === 'age_max') ? error.value : ''">
                      <el-input
                        v-model="jobForm.age_max"
                        :placeholder="$t('common.select')"
                        maxlength="3"
                        @focus="resetValidate('age_max')"
                        @blur="checkAgeMinMax"
                      />
                    </el-form-item>
                    <span class="age-text">{{ $t('my_page.under_age') }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left ">{{ $t('my_page.gender') }}</div>
            <div ref="gender_ids" class="register-job__right gender-checkbox">
              <div class="register-job__gender">
                <el-form-item label="" prop="gender_ids" :error="(error.key === 'gender_ids') ? error.value : ''">
                  <el-checkbox-group v-model="jobForm.gender_ids">
                    <el-checkbox v-for="gender in listGenders" :label="gender.id" :key="gender.id" :value="gender.id">
                      {{ gender.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left d-flex items-center">{{ $t('condition.experience') }}</div>
            <div ref="experience_ids" class="register-job__right">
              <el-form-item label="" prop="experience_ids" :error="(error.key === 'experience_ids') ? error.value : ''">
                <el-select
                  class="select-wide resize-width"
                  v-model="jobForm.experience_ids"
                  multiple
                  :placeholder="$t('job_list.enter_place')"
                  @change="validate('experience_ids')"
                  @focus="resetValidate('experience_ids')"
                  @visible-change="(event) => { checkValidate('experience_ids', event) }"
                >
                  <div v-if="listExperiences.length === 0">
                    <el-option :label="$t('job_list.enter_place')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                  </div>
                  <el-option v-for="item in listExperiences" :key="item.id" :label="item.name"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="register-job__col form-address">
            <div class="register-job__left show-pc">
              <div class="d-flex justify-between">
                <span>{{ $t('job.work_type') }}</span>
                <div class="required-field">{{ $t('form.required') }}</div>
              </div>
            </div>
            <div class="register-job__left show-sp">
              <div class="d-flex justify-between">
                <span>{{ $t('my_page.post_code') }}</span>
              </div>
            </div>
            <div ref="postal_code" class="register-job__right">
              <div class="d-flex flex-col">
                <el-form-item class="form-address-postal-code" label="" prop="postal_code" :error="(error.key === 'postal_code') ? error.value : ''">
                  <el-input
                    :disabled="store_id ? true : false"
                    class="w-130 postal-code"
                    pattern="[0-9]*"
                    type="text"
                    title=""
                    v-model.trim="jobForm.postal_code"
                    placeholder="000-0000"
                    @input="zipCodeInput"
                    @focus="resetValidate('postal_code')"
                    @change="checkPostalCode"
                    @blur="checkPostalCodeValid"
                  />
                </el-form-item>
                <div class="d-flex g-16 pt-14 form-address-input">
                  <div class="d-flex flex-col form-address-data" ref="province_id">
                    <span class="work-type">
                      {{ $t('my_page.prefectures') }}
                     <span class="show-sp required-field">{{ $t('form.required') }}</span>
                    </span>
                    <el-form-item label="" prop="province_id" :error="(error.key === 'province_id') ? error.value : ''">
                      <el-select
                        :disabled="store_id ? true : false"
                        class="w-130 resize-width"
                        v-model="jobForm.province_id"
                        :placeholder="$t('my_page.prefectures')"
                        @change="changeCity"
                        @focus="resetValidate('province_id')"
                        @visible-change="(event) => { checkValidate('province_id', event) }"
                      >
                        <div v-if="listProvinces.length === 0">
                          <el-option :label="$t('my_page.prefectures')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                        </div>
                        <el-option v-for="item in listProvinces" :key="item.id" :label="item.name"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="d-flex flex-col form-address-data" ref="province_city_id">
                    <span class="work-type">
                      {{ $t('my_page.municipalities') }}
                      <span class="show-sp required-field">{{ $t('form.required') }}</span>
                    </span>
                    <el-form-item label="" prop="province_city_id" :error="(error.key === 'province_city_id') ? error.value : ''">
                      <el-select
                        class="w-130 resize-width"
                        v-model="jobForm.province_city_id"
                        :placeholder="$t('my_page.municipalities')"
                        :disabled="store_id ? true : disabledProvinceCity"
                        @focus="resetValidate('province_city_id')"
                        @visible-change="(event) => { checkValidate('province_city_id', event) }"
                      >
                        <div v-if="listCities.length === 0">
                          <el-option :label="$t('my_page.municipalities')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                        </div>
                        <el-option v-for="item in listCities" :key="item.id" :label="item.name"
                                   :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div ref="address" class="d-flex flex-col form-address-data">
                    <span class="work-type">
                      {{ $t('my_page.address2') }}
                      <span class="show-sp required-field">{{ $t('form.required') }}</span>
                    </span>
                    <el-form-item label="" prop="address" :error="(error.key === 'address') ? error.value : ''">
                      <el-input :disabled="store_id ? true : false" class="w-130 resize-width" v-model="jobForm.address" maxlength="255" :placeholder="$t('common.placeholder.address')" @focus="resetValidate('address')" />
                    </el-form-item>
                  </div>
                  <div class="d-flex flex-col form-address-data">
                    <span class="work-type">{{ $t('my_page.building_name') }}</span>
                    <el-form-item label="" prop="building" :error="(error.key === 'building') ? error.value : ''">
                      <el-input :disabled="store_id ? true : false" class="w-195 resize-width" v-model="jobForm.building" maxlength="255" :placeholder="$t('common.placeholder.building')" @focus="resetValidate('building')" />
                    </el-form-item>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="register-job__col form-station">
            <div class="register-job__left d-flex items-center">{{ $t('job.station1') }}</div>
            <div ref="station1" class="register-job__right">
              <div class="station-select d-flex g-16">
                <el-form-item label="" prop="station_ids" :error="errors.station1">
                  <el-select class="w-160 resize-width" v-model="station1.province" clearable :placeholder="$t('job.station_placeholder.province')" @change="(value) => { changeStationProvince(1, value) }" @focus="resetValidateStation('station1')">
                    <div v-if="listStationProvinces.length === 0">
                      <el-option :label="$t('job.station_placeholder.province')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                    </div>
                    <el-option v-for="(item, key) in listStationProvinces" :key="key" :label="key" :value="key" :disabled="item.length === 0">
                    </el-option>
                  </el-select>
                  <div class="station-sp">
                    <el-select class="w-160 resize-width" v-model="station1.railway" clearable :disabled="(listStationRailways[1].length === 0)" :placeholder="$t('job.station_placeholder.railway')" @change="(value) => { changeStationRailway(1, value) }" @focus="resetValidateStation('station1')">
                      <div v-if="listStationRailways[1].length === 0">
                        <el-option :label="$t('job.station_placeholder.railway')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                      </div>
                      <el-option v-for="(item, key) in listStationRailways[1]" :key="key" :label="key" :value="key" :disabled="item.length === 0">
                      </el-option>
                    </el-select>
                    <el-select class="w-160 resize-width" v-model="station1.station" clearable :disabled="(listStations[1].length === 0)" :placeholder="$t('job.station_placeholder.station')" @focus="resetValidateStation('station1')">
                      <div v-if="listStations[1].length === 0">
                        <el-option :label="$t('job.station_placeholder.station')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                      </div>
                      <el-option v-for="item in listStations[1]" :key="item.id" :label="item.station_name" :value="item.id" :disabled="item.disabled">{{ item.station_name }}
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="register-job__col form-station">
            <div class="register-job__left d-flex items-center">{{ $t('job.station2') }}</div>
            <div ref="station2" class="register-job__right">
              <div class="station-select d-flex g-16">
                <el-form-item label="" prop="station_ids2" :error="errors.station2">
                  <el-select class="w-160 resize-width" v-model="station2.province" clearable :placeholder="$t('job.station_placeholder.province')" @change="(value) => { changeStationProvince(2, value) }" @focus="resetValidateStation('station2')">
                    <div v-if="listStationProvinces.length === 0">
                      <el-option :label="$t('job.station_placeholder.province')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                    </div>
                    <el-option v-for="(item, key) in listStationProvinces" :key="key" :label="key" :value="key" :disabled="item.length === 0">
                    </el-option>
                  </el-select>
                  <div class="station-sp">
                    <el-select class="w-160 resize-width" v-model="station2.railway" clearable :disabled="(listStationRailways[2].length === 0)" :placeholder="$t('job.station_placeholder.railway')" @change="(value) => { changeStationRailway(2, value) }" @focus="resetValidateStation('station2')">
                      <div v-if="listStationRailways[2].length === 0">
                        <el-option :label="$t('job.station_placeholder.railway')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                      </div>
                      <el-option v-for="(item, key) in listStationRailways[2]" :key="key" :label="key" :value="key" :disabled="item.length === 0">
                      </el-option>
                    </el-select>
                    <el-select class="w-160 resize-width" v-model="station2.station" clearable :disabled="(listStations[2].length === 0)" :placeholder="$t('job.station_placeholder.station')" @focus="resetValidateStation('station2')">
                      <div v-if="listStations[2].length === 0">
                        <el-option :label="$t('job.station_placeholder.station')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                      </div>
                      <el-option v-for="item in listStations[2]" :key="item.id" :label="item.station_name" :value="item.id" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="register-job__col form-station">
            <div class="register-job__left d-flex items-center">{{ $t('job.station3') }}</div>
            <div class="register-job__right">
              <div ref="station3" class="station-select d-flex g-16">
                <el-form-item label="" prop="station_ids3" :error="errors.station3">
                  <el-select class="w-160 resize-width" v-model="station3.province" clearable :placeholder="$t('job.station_placeholder.province')" @change="(value) => { changeStationProvince(3, value) }" @focus="resetValidateStation('station3')">
                    <div v-if="listStationProvinces.length === 0">
                      <el-option :label="$t('job.station_placeholder.province')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                    </div>
                    <el-option v-for="(item, key) in listStationProvinces" :key="key" :label="key" :value="key">
                    </el-option>
                  </el-select>
                  <div class="station-sp">
                    <el-select class="w-160 resize-width" v-model="station3.railway" clearable :disabled="(listStationRailways[3].length === 0)" :placeholder="$t('job.station_placeholder.railway')" @change="(value) => { changeStationRailway(3, value) }" @focus="resetValidateStation('station3')">
                      <div v-if="listStationRailways[3].length === 0">
                        <el-option :label="$t('job.station_placeholder.railway')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                      </div>
                      <el-option v-for="(item, key) in listStationRailways[3]" :key="key" :label="key" :value="key" :disabled="item.length === 0">
                      </el-option>
                    </el-select>
                    <el-select class="w-160 resize-width" v-model="station3.station" clearable :disabled="(listStations[3].length === 0)" :placeholder="$t('job.station_placeholder.station')" @focus="resetValidateStation('station3')">
                      <div v-if="listStations[3].length === 0">
                        <el-option :label="$t('job.station_placeholder.station')" :value="$t('job_list.enter_place')" :disabled="true"></el-option>
                      </div>
                      <el-option v-for="item in listStations[3]" :key="item.id" :label="item.station_name" :value="item.id" :disabled="item.disabled">
                      </el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left d-flex justify-between ">
              <span>{{ $t('job.welfare_treatment') }}</span>
              <div class="required-field">{{ $t('form.required') }}</div>
            </div>
            <div ref="welfare_treatment_description" class="register-job__right d-flex flex-col">
              <el-form-item label="" prop="welfare_treatment_description" :error="(error.key === 'welfare_treatment_description') ? error.value : ''">
                <el-input class="" type="textarea" :rows="3" v-model="jobForm.welfare_treatment_description" @focus="resetValidate('welfare_treatment_description')" maxlength="2000"
                          :placeholder="$t('job.welfare_treatment')" />
              </el-form-item>
              <div class="register-job__description">{{ $t('common.limit_characters', { current: showLengthTextarea(jobForm.welfare_treatment_description), max: 2000 }) }}</div>
            </div>
          </div>
          <div class="register-job__col">
            <div class="register-job__left">{{ $t('condition.feature') }}</div>
            <div class="register-job__right">
              <el-checkbox-group v-model="jobForm.feature_ids">
                <div v-for="(list, key) in listJobFeatures" :key="key" class="multi-checkbox">
                  <span class="multi-checkbox__title">{{ list.category_name }}</span>
                  <div class="multi-checkbox__layout">
                    <div role="group" aria-label="checkbox-group" class="el-checkbox-group">
                      <el-checkbox v-for="feature in list.feature" :key="feature.id" :label="feature.id">{{ feature.name }}</el-checkbox>
                    </div>
                  </div>
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="register-job__button">
          <el-button class="draft-button" @click="register(STATUS_DRAFT)">{{ $t('common.save_as_draft') }}</el-button>
          <el-button type="danger" class="send-button" @click="register(STATUS_REGISTER)">{{ $t('form.register') }}</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import {
  GET_STORE_DETAIL,
  GET_ZIP_CODE,
  INDEX_SET_ERROR,
  INDEX_SET_LOADING,
  INDEX_SET_SUCCESS, INDEX_SET_TITLE_MENU,
  JOB_ALL_STORE,
  JOB_REGISTER_JOB,
  MASTER_GET_DATA,
  SET_STATE_MENU,
  UPLOAD_IMAGE
} from '../../store/store.const'
import { LINKS_HOURS, LINKS_HOURS_12, LINKS_MINUTES } from '../../utils/handleDate'

export default {
  name: 'RegisterJobPage',
  data() {
    const validFormLength = (rule, value, callback, message) => {
      if (value && value.length > 255) {
        callback(new Error(this.$t('validation.max_length', { _field_: message })))
      } else {
        callback()
      }
    }
    const validFormAgeLength = (rule, value, callback) => {
      if (value && Number(value) < 16) {
        callback(new Error(this.$t('validation.err040')))
      } else if (value && Number(value) > 127) {
        callback(new Error(this.$t('validation.err033')))
      } else {
        callback()
      }
    }
    const validRequiredArray = (rule, value, callback, message) => {
      if (value.length === 0) {
        callback(new Error(message))
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
    const validRequired = (rule, value, callback, message) => {
      if (!value || value.trim() === '') {
        callback(new Error(message))
      } else {
        callback()
      }
    }
    const validRequiredNumber = (rule, value, callback, message) => {
      if (!(String(value)) || String(value).trim() === '') {
        callback(new Error(this.$t('validation.required', { _field_: message })))
      } else {
        callback()
      }
    }
    const validRequiredNumberLength = (rule, value, callback, message) => {
      if (String(value).length > 8) {
        callback(new Error(message))
      } else {
        callback()
      }
    }
    const validAreaLength = (rule, value, callback, message) => {
      if (value && value.length > 2000) {
        callback(new Error(message))
      } else {
        callback()
      }
    }
    return {
      jobForm: {
        range_hours_type: 1,
        start_work_time_type: '',
        end_work_time_type: '',
        postal_code: '',
        name: '',
        job_status_id: '',
        store_id: '',
        job_banner: '',
        job_thumbnails: [],
        job_type_ids: [],
        working_days: [],
        work_type_ids: [],
        salary_type_id: 1,
        salary_min: '',
        salary_max: '',
        salary_description: '',
        pick_up_point: '',
        description: '',
        shifts: '',
        age_min: '',
        age_max: '',
        gender_ids: [],
        province_city_id: '',
        province_id: '',
        building: '',
        address: '',
        start_work_time: '',
        end_work_time: '',
        welfare_treatment_description: '',
        experience_ids: [],
        feature_ids: [],
        companyFeature: [],
        storeFeature: [],
        station_ids: [],
        errors: {}
      },
      errors: {
        station1: '',
        station2: '',
        station3: '',
        age_min_max: '',
        start_end_time: '',
        salary_min_max: ''
      },
      error: {
        key: null,
        value: ''
      },
      jobRules: {
        name: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.job_title') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.job_title') }), trigger: 'blur' }
        ],
        store_id: [
          {
            required: true,
            message: this.$t('validation.required_select', { _field_: this.$t('career.store_name') }),
            trigger: 'blur'
          }
        ],
        pick_up_point: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('my_page.pick_up_point') }), trigger: 'blur' }
        ],
        salary_description: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('my_page.salary_details') }), trigger: 'blur' }
        ],
        job_banner: [
          {
            required: true,
            message: this.$t('validation.com020', { _field_: this.$t('my_page.main_image') }),
            trigger: 'blur'
          }
        ],
        salary_type_id: [
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('job.salary') }),
            trigger: 'blur'
          }
        ],
        salary_min: [
          { validator: validRequiredNumber, message: this.$t('validation.required', { _field_: this.$t('job.salary_min') }), trigger: 'blur' },
          { validator: validRequiredNumberLength, message: this.$t('validation.max', { _field_: this.$t('job.salary_min'), length: 8 }), trigger: 'blur' }
        ],
        salary_max: [
          { validator: validRequiredNumber, message: this.$t('validation.required', { _field_: this.$t('job.salary_max') }), trigger: 'blur' },
          { validator: validRequiredNumberLength, message: this.$t('validation.max', { _field_: this.$t('job.salary_max'), length: 8 }), trigger: 'blur' }
        ],
        age_min: [
          { validator: validFormAgeLength, trigger: 'blur' }
        ],
        age_max: [
          { validator: validFormAgeLength, trigger: 'blur' }
        ],
        job_thumbnails: [
          { validator: validRequiredArray, message: this.$t('validation.com020', { _field_: this.$t('my_page.sub_image') }), trigger: 'blur' }
        ],
        job_type_ids: [
          { validator: validRequiredArray, message: this.$t('validation.required_select', { _field_: this.$t('job.recruitment_type') }), trigger: 'blur' }
        ],
        work_type_ids: [
          { validator: validRequiredArray, message: this.$t('validation.required_select', { _field_: this.$t('job.employment_status') }), trigger: 'change' }
        ],
        description: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('favorite_job.description') }), trigger: 'blur' },
          {
            required: true,
            message: this.$t('validation.required', { _field_: this.$t('favorite_job.description') }),
            trigger: 'blur'
          },
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('favorite_job.description') }), trigger: 'blur' }
        ],
        start_work_time: [
          { validator: validRequired, message: this.$t('validation.required_select', { _field_: this.$t('my_page.start_time') }), trigger: 'blur' }
        ],
        end_work_time: [
          { validator: validRequired, message: this.$t('validation.required_select', { _field_: this.$t('my_page.end_time') }), trigger: 'blur' }
        ],
        postal_code: [
          { validator: validPostCode, message: this.$t('validation.postcode_length', { _field_: this.$t('my_page.post_code') }), trigger: 'blur' }
        ],
        province_id: [
          {
            required: true,
            message: this.$t('validation.required_select', { _field_: this.$t('my_page.prefectures') }),
            trigger: 'blur'
          }
        ],
        province_city_id: [
          {
            required: true,
            message: this.$t('validation.required_select', { _field_: this.$t('my_page.municipalities') }),
            trigger: 'blur'
          }
        ],
        address: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('my_page.address2') }), trigger: 'blur' },
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.address2') }), trigger: 'blur' }
        ],
        welfare_treatment_description: [
          { validator: validRequired, message: this.$t('validation.required', { _field_: this.$t('job.welfare_treatment') }), trigger: 'blur' },
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('job.welfare_treatment') }), trigger: 'blur' }
        ],
        building: [
          { validator: validFormLength, message: this.$t('validation.max_length', { _field_: this.$t('my_page.building_name') }), trigger: 'blur' }
        ],
        shifts: [
          { validator: validAreaLength, message: this.$t('validation.area_length', { _field_: this.$t('my_page.working_hours_detail') }), trigger: 'blur' }
        ]
      },
      storeNameOptions: [],
      imageDetailShow: [],
      imageAvatarShow: '',
      action: '',
      listProvinces: [],
      listWorkTypes: [],
      listJobTypes: [],
      listExperiences: [],
      listHourTypes: [
        { id: 1, name: '24時間表示' },
        { id: 2, name: '12時間表示' }
      ],
      listMorning: [],
      listSalaryTypes: [],
      listJobStatus: [],
      listGenders: [],
      listWorkDay: [],
      listCities: [],
      listJobFeatures: [],
      listStationProvinces: [],
      listStationRailways: { 1: [], 2: [], 3: [] },
      listStations: { 1: [], 2: [], 3: [] },
      station1: { province: '', railway: '', station: '' },
      station2: { province: '', railway: '', station: '' },
      station3: { province: '', railway: '', station: '' },
      startHour: '',
      startMinute: '',
      endHour: '',
      endMinute: '',
      STATUS_REGISTER: 2,
      STATUS_DRAFT: 1,
      disabledProvinceCity: true,
      linksHours: [],
      linksMinutes: [],
      clonedJobForm: {},
      store_id: this.$route.query.store_id
    }
  },
  computed: {
    ...mapState({
      stateMenu: state => state.stateMenu
    }),
    disabledButton() {
      return this.jobForm.name === '' || this.jobForm.store_id === '' || this.jobForm.employeeType === '' || this.jobForm.description === ''
    },
    disableImgUp() {
      return this.imageDetailShow.length >= 3
    }
  },
  async created() {
    this.$store.commit(INDEX_SET_TITLE_MENU, { title: this.$t('my_page.job_list'), subTitle: 'Job list' })
    await this.getMasterData()
    if (this.store_id) {
      await this.getStore()
    }
    this.linksMinutes = LINKS_MINUTES()
    this.linksHours = LINKS_HOURS
    this.clonedJobForm = _.cloneDeep(this.jobForm)
  },
  watch: {
    startHour() {
      this.changeDate('start')
    },
    startMinute() {
      this.changeDate('start')
    },
    endHour() {
      this.changeDate('end')
    },
    endMinute() {
      this.changeDate('end')
    },
    'jobForm.province_id'() {
      this.disabledProvinceCity = !this.jobForm.province_id
    },
    'jobForm.job_banner'() {
      if (this.jobForm.job_banner) {
        this.resetValidate('job_banner')
      }
    },
    'jobForm.job_thumbnails'() {
      if (this.jobForm.job_thumbnails.length) {
        this.resetValidate('job_thumbnails')
      }
    },
    'jobForm.start_work_time'() {
      this.checkStartEnd()
    },
    'jobForm.end_work_time'() {
      this.checkStartEnd()
    },
    'jobForm.start_work_time_type'() {
      this.checkStartEnd()
    },
    'jobForm.end_work_time_type'() {
      this.checkStartEnd()
    },
    'jobForm.range_hours_type'() {
      this.linksHours = this.jobForm.range_hours_type === 1 ? LINKS_HOURS : LINKS_HOURS_12
      this.startHour = ''
      this.startMinute = ''
      this.endHour = ''
      this.endMinute = ''
    }
  },
  methods: {
    changeDate(type) {
      if (type === 'start') {
        if (this.startHour && this.startMinute) {
          this.jobForm.start_work_time = this.startHour + ':' + this.startMinute
          this.resetValidate('start_work_time')
          this.validate('start_work_time')
        } else {
          this.jobForm.start_work_time = ''
        }
      }
      if (type === 'end') {
        if (this.endHour && this.endMinute) {
          this.jobForm.end_work_time = this.endHour + ':' + this.endMinute
          this.resetValidate('end_work_time')
          this.validate('end_work_time')
        } else {
          this.jobForm.end_work_time = ''
        }
      }
    },
    showNumber(number) {
      if (Number(number) < 10) {
        return '0' + number
      }
      return number
    },
    async getMasterData() {
      await this.$store.commit(INDEX_SET_LOADING, true)
      const dataResources = [
        'resources[m_work_types]={"model": "MWorkType"}',
        'resources[province_districts]={"model": "MProvince"}',
        'resources[m_job_statuses]={"model": "MJobStatus"}',
        'resources[m_job_types]={"model": "MJobType"}',
        'resources[m_job_experiences]={"model": "MJobExperience"}',
        'resources[m_genders]={"model": "Gender"}',
        'resources[m_job_features]={}',
        'resources[m_salary_types]={}',
        'resources[days_of_week]={}',
        'resources[m_stations]={}',
        'resources[range_hours_type]={}',
        'resources[morning_afternoon]={}'
      ]
      const dataMasterData = await this.$store.dispatch(MASTER_GET_DATA, dataResources.join('&'))
      if (dataMasterData.status_code === 200) {
        const listProvinces = {}
        dataMasterData.data.province_districts.forEach(district => {
          district.provinces.forEach(province => {
            listProvinces[province.id] = province
          })
        })
        this.listStationProvinces = dataMasterData.data.m_stations
        this.listProvinces = listProvinces
        this.listWorkTypes = dataMasterData.data.m_work_types
        this.listJobStatus = dataMasterData.data.m_job_statuses
        this.listJobTypes = dataMasterData.data.m_job_types
        this.listExperiences = dataMasterData.data.m_job_experiences
        this.listSalaryTypes = dataMasterData.data.m_salary_types
        this.listGenders = dataMasterData.data.m_genders
        this.listJobFeatures = dataMasterData.data.m_job_features
        this.listWorkDay = dataMasterData.data.days_of_week
        this.listHourTypes = dataMasterData.data.range_hours_type
        this.listMorning = dataMasterData.data.morning_afternoon
        this.jobForm.start_work_time_type = dataMasterData.data.range_hours_type[0].id
        this.jobForm.end_work_time_type = dataMasterData.data.range_hours_type[0].id
      }
      const dataResponse = await this.$store.dispatch(JOB_ALL_STORE)
      if (dataResponse.status_code === 200) {
        this.storeNameOptions = dataResponse.data
        this.jobForm.store_id = dataResponse.data[0].id
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    resetValidate(ref) {
      if (ref === this.error.key) {
        this.error = { key: null, value: '' }
      }
      if (['salary_min', 'salary_max'].includes(ref)) {
        this.errors.salary_min_max = ''
      }
      if (['start_work_time', 'end_work_time'].includes(ref)) {
        this.errors.start_end_time = ''
      }
      if (['age_min', 'age_max'].includes(ref)) {
        this.errors.age_min_max = ''
      }
      this.$refs.jobForm.fields.find((f) => f.prop === ref).clearValidate()
      this.jobForm.errors[ref] = ''
    },
    validate(ref) {
      this.$refs.jobForm.validateField(ref)
    },
    resetValidateStation(ref) {
      this.errors[ref] = ''
    },
    checkStation() {
      if (this.station1.province && (this.station1.station === '')) {
        this.errors.station1 = this.$t('validation.com025')
      }
      if (this.station2.province && (this.station2.station === '')) {
        this.errors.station2 = this.$t('validation.com025')
      }
      if (this.station3.province && (this.station3.station === '')) {
        this.errors.station3 = this.$t('validation.com025')
      }
    },
    checkValidate(ref, event) {
      if (!event) {
        this.$refs.jobForm.validateField(ref)
        if (['start_work_time', 'end_work_time'].includes(ref)) {
          this.checkStartEnd()
        }
      } else {
        this.resetValidate(ref)
      }
    },
    checkFile(file) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i
      if (file.size >= 20000000) {
        return this.$t('validation.err003')
      }
      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/svg'].includes(file.type) && !allowedExtensions.exec(file.name)) {
        return this.$t('validation.err005')
      }
      return ''
    },
    async onFileChange(e) {
      const file = e.target.files[0]
      const valid = this.checkFile(file)
      if (valid) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: valid })
      } else {
        this.file = file
        await this.upLoadFile('job_banner')
      }
      this.$refs.fileUploadAvatar.value = null
    },
    async onFileChangeDetail(e) {
      for (let x = 0; x < e.target.files.length; x++) {
        const valid = this.checkFile(e.target.files[x])
        if (valid) {
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: valid })
          this.$refs.fileUploadDetail.value = null
          return
        }
      }
      for (let x = 0; x < e.target.files.length; x++) {
        const formData = new FormData()
        formData.append('image', e.target.files[x])
        formData.append('type', 'job_detail')
        const data = await this.$store.dispatch(UPLOAD_IMAGE, formData)
        switch (data.status_code) {
          case 200:
            if (this.imageDetailShow.length < 3) {
              this.imageDetailShow.push(data.data.thumb)
            }
            this.jobForm.job_thumbnails = this.imageDetailShow
            if (this.imageDetailShow.length >= 3) {
              this.$refs.fileUploadDetail.value = null
              return
            }
            break
          case 401:
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
            this.$auth.logout()
            break
          case 422:
            for (const [key] of Object.entries(data.data)) {
              await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.data[key][0] })
            }
            break
          case 500:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: this.$t('content.EXC_001')
            })
            break
          default:
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
            break
        }

        if (this.imageDetailShow.length > 3) {
          this.imageDetailShow.splice(3, this.imageDetailShow.length - 3)
        }
      }
      this.$refs.fileUploadDetail.value = null
    },
    async upLoadFile(type) {
      const formData = new FormData()
      formData.append('image', this.file)
      formData.append('type', type)

      const data = await this.$store.dispatch(UPLOAD_IMAGE, formData)
      switch (data.status_code) {
        case 200:
          this.jobForm.job_banner = data.data.thumb
          this.imageAvatarShow = data.data.thumb
          return true
        case 401:
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
          this.$auth.logout()
          break
        case 422:
          for (const [key] of Object.entries(data.data)) {
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.data[key][0] })
          }
          break
        case 500:
          await this.$store.commit(INDEX_SET_ERROR, {
            show: true,
            text: this.$t('content.EXC_001')
          })
          break
        default:
          await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
          break
      }
      return false
    },
    removeImage(index) {
      this.imageDetailShow = this.imageDetailShow.filter(function(item, key) {
        return key !== index
      })
      this.jobForm.job_thumbnails = this.jobForm.job_thumbnails.filter(function(item, key) {
        return key !== index
      })
    },
    removeAvatar() {
      this.imageAvatarShow = ''
      this.jobForm.avatar = ''
    },
    scrollToElement(key) {
      const el = this.$refs[key]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    async register(status) {
      if (status === this.STATUS_DRAFT) {
        await this.registerJob(status)
        return
      }
      let check = true
      if (this.error.key) {
        this.scrollToElement(this.error.key)
        check = false
      }
      this.checkStation()
      for (const index in this.errors) {
        if (this.errors[index]) {
          this.scrollToElement(index)
          check = false
        }
      }
      this.$refs.jobForm.validate(async(valid, key) => {
        if (valid && check) {
          await this.registerJob(status)
        } else {
          this.scrollToElement(Object.keys(key)[0])
        }
      })
    },
    async registerJob(status) {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const dto = _.cloneDeep(this.jobForm)
        dto.job_status_id = status
        dto.postal_code = dto.postal_code ? dto.postal_code.replace(/[^0-9]/g, '') : dto.postal_code
        const stations = []
        if (this.station1.station) {
          stations.push(this.station1.station)
        }
        if (this.station2.station) {
          stations.push(this.station2.station)
        }
        if (this.station3.station) {
          stations.push(this.station3.station)
        }
        dto.station_ids = stations
        const response = await this.$store.dispatch(JOB_REGISTER_JOB, dto)
        switch (response.status_code) {
          case 200:
            await this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: response.messages
            })
            this.clonedJobForm = _.cloneDeep(this.jobForm)
            if (this.store_id) {
              await this.$router.push('/store-management')
            } else {
              await this.$router.push('/list-job')
            }
            break
          case 401:
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
            this.$auth.logout()
            break
          case 422:
            for (const [key] of Object.entries(response.data)) {
              this.error = { key, value: response.data[key][0] }
              this.scrollToElement(key)
            }
            break
          case 500:
            await this.$store.commit(INDEX_SET_ERROR, {
              show: true,
              text: this.$t('content.EXC_001')
            })
            break
          default:
            await this.$store.commit(INDEX_SET_ERROR, { show: true, text: response.messages })
            break
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    },
    changeCity(value) {
      this.listCities = this.listProvinces[value].province_city
      this.jobForm.province_city_id = ''
      this.validate('province_id')
    },
    zipCodeInput() {
      const x = this.jobForm.postal_code.replace(/\D/g, '').match(/(\d{0,3})(\d{0,4})/)
      this.jobForm.postal_code = !x[2] ? x[1] : '' + x[1] + '-' + x[2]
    },
    changeMinute(key) {
      if (this[key] === '') {
        this[key] = '00'
      }
    },
    zipCodeFormat(zip) {
      return zip ? zip.toString().slice(0, 3) + '-' + zip.toString().slice(3) : ''
    },
    async checkPostalCode() {
      try {
        this.zipCodeInput()
        if (this.jobForm.postal_code.length === 8) {
          await this.$store.commit(INDEX_SET_LOADING, true)
          let dto = _.cloneDeep(this.jobForm.postal_code)
          dto = dto.replace(/[^0-9]/g, '')
          const data = await this.$store.dispatch(GET_ZIP_CODE, dto)
          let province_city_id = 0
          switch (data.status_code) {
            case 200:
              if (data.data.length === undefined) {
                this.jobForm.province_id = data.data.province_id
                this.listCities = this.listProvinces[data.data.province_id].province_city
                for (const key in this.listCities) {
                  if (this.listCities[key].id === data.data.province_city_id) {
                    province_city_id = Number(key)
                  }
                }
                this.jobForm.province_city_id = this.listCities[province_city_id].id
                this.jobForm.address = data.data.address
                this.resetValidate('province_id')
                this.resetValidate('province_city_id')
              } else if (data.data.length === 0) {
                this.error = {
                  key: 'postal_code',
                  value: this.$t('validation.com015', { _field_: this.$t('my_page.post_code') })
                }
              }
              break
            case 401:
              await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.token_expired') })
              this.$auth.logout()
              break
            case 422:
              for (const [key] of Object.entries(data.data)) {
                if (this.jobForm[key] !== undefined) {
                  this.error = { key, value: data.data[key][0] }
                  this.scrollToElement(key)
                }
              }
              break
            case 500:
              await this.$store.commit(INDEX_SET_ERROR, {
                show: true,
                text: this.$t('content.EXC_001')
              })
              break
            default:
              await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
              break
          }
        }
        await this.$store.commit(INDEX_SET_LOADING, false)
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    async checkPostalCodeValid() {
      try {
        if (this.jobForm.postal_code.length === 8) {
          let dto = _.cloneDeep(this.jobForm.postal_code)
          dto = dto.replace(/[^0-9]/g, '')
          const data = await this.$store.dispatch(GET_ZIP_CODE, dto)
          let province_city_id = 0
          switch (data.status_code) {
            case 200:
              if (data.data.length === undefined) {
                this.jobForm.province_id = data.data.province_id
                this.listCities = this.listProvinces[data.data.province_id].province_city
                for (const key in this.listCities) {
                  if (this.listCities[key].id === data.data.province_city_id) {
                    province_city_id = Number(key)
                  }
                }
                this.jobForm.province_city_id = this.listCities[province_city_id].id
              } else if (data.data.length === 0) {
                this.error = {
                  key: 'postal_code',
                  value: this.$t('validation.com015', { _field_: this.$t('my_page.post_code') })
                }
              }
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
              await this.$store.commit(INDEX_SET_ERROR, { show: true, text: data.messages })
              break
          }
        }
      } catch (err) {
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('message.message_error') })
      }
    },
    changeStationProvince(index, value) {
      if (value) {
        this.listStationRailways[index] = this.listStationProvinces[value]
      } else {
        this.listStationRailways[index] = []
        this.resetValidateStation('station' + index)
      }
      this.listStations[index] = []
      this['station' + index].railway = ''
      this['station' + index].station = ''
    },
    changeStationRailway(index, value) {
      if (value) {
        this.listStations[index] = this.listStationRailways[index][value]
      } else {
        this.listStations[index] = []
        this.resetValidateStation('station' + index)
      }
      this['station' + index].station = ''
    },
    checkMinMax() {
      const salary_max = this.jobForm.salary_max
      const salary_min = this.jobForm.salary_min
      if (salary_max && salary_min && Number(salary_min) >= Number(salary_max)) {
        this.errors.salary_min_max = this.$t('validation.err028')
      } else {
        this.errors.salary_min_max = ''
      }
      this.checkNumber(salary_max, 'salary_max')
      this.checkNumber(salary_min, 'salary_min')
    },
    checkStartEnd() {
      const start_work_time = this.jobForm.start_work_time
      const end_work_time = this.jobForm.end_work_time
      if (this.jobForm.end_work_time_type === 2 && this.jobForm.start_work_time_type === 1 && this.jobForm.range_hours_type === 2) {
        this.errors.start_end_time = ''
        return
      }
      if (start_work_time && end_work_time && (start_work_time > end_work_time)) {
        this.errors.start_end_time = this.$t('validation.err031')
      } else {
        this.errors.start_end_time = ''
      }
    },
    checkAgeMinMax() {
      const age_min = this.checkNumber(this.jobForm.age_min, 'age_min')
      const age_max = this.checkNumber(this.jobForm.age_max, 'age_max')
      this.errors.age_min_max = ''
      if (this.jobForm.age_min && this.jobForm.age_max) {
        if (Number(age_min) >= 16 && Number(age_min) <= 127 && Number(age_max) >= 16 && Number(age_max) <= 127) {
          if ((Number(age_min) >= Number(age_max))) {
            this.errors.age_min_max = this.$t('validation.err032')
          }
        }
      }
    },
    checkNumber(value, key) {
      if (String(value).replace(/[^0-9]/g, '')) {
        if (value !== Number(value)) {
          this.jobForm[key] = Number(value.replace(/[^0-9]/g, ''))
          return Number(value.replace(/[^0-9]/g, ''))
        }
        return this.jobForm[key]
      } else {
        this.jobForm[key] = ''
        return ''
      }
    },
    showLengthTextarea(value) {
      if (value) {
        return ('000' + value.length).slice(-4)
      }
      return '0000'
    },
    async getStore() {
      try {
        await this.$store.commit(INDEX_SET_LOADING, true)
        const data = await this.$store.dispatch(GET_STORE_DETAIL, this.$route.query.store_id)
        let dataApi = {}
        let store_id = 0
        switch (data.status_code) {
          case 200:
            this.$store.commit(INDEX_SET_SUCCESS, {
              show: true,
              text: data.messages
            })
            dataApi = data.data[0]
            this.storeNameOptions.forEach((element) => {
              if (element.name === dataApi.store_name) {
                store_id = element.id
              }
            })
            this.jobForm.store_id = store_id
            this.jobForm.store_name = dataApi.store_name
            this.jobForm.address = dataApi.address.address
            this.jobForm.building = dataApi.address.building
            this.jobForm.postal_code = this.zipCodeFormat(dataApi.address.postal_code)
            this.jobForm.province_id = dataApi.address.province_id
            this.listCities = this.listProvinces[dataApi.address.province_id].province_city
            this.jobForm.province_city_id = dataApi.address.province_city_id
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
        await this.$store.commit(INDEX_SET_ERROR, { show: true, text: this.$t('content.EXC_001') })
      }
      await this.$store.commit(INDEX_SET_LOADING, false)
    }
  },
  async beforeRouteLeave(to, from, next) {
    const dataClone = _.cloneDeep(this.clonedJobForm)
    const data = _.cloneDeep(this.jobForm)
    dataClone.errors = {}
    data.errors = {}
    if (!_.isEqual(data, dataClone)) {
      await this.$confirm(this.$t('content.CON_002'), {
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
