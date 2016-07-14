<?php

class hUploader {

    function uploadFiles($files, $sub_directory, $allowed_file_types = '', $random_split_folders = false, $multiple_upload = false, $field = '') {
        if (count($files) > 0) {
            $upload_directory = AppUploads;
            if ($sub_directory != '') {
                $upload_directory.= $sub_directory;
            }
            if (is_array($multiple_upload)) {
                foreach ($files['name'][$multiple_upload['index']][$multiple_upload['field']] as $key => $value) {
                    $formatted_files[$key]['name'] = $value;
                    $formatted_files[$key]['type'] = $files['type'][$multiple_upload['index']][$multiple_upload['field']][$key];
                    $formatted_files[$key]['error'] = $files['error'][$multiple_upload['index']][$multiple_upload['field']][$key];
                    $formatted_files[$key]['size'] = $files['size'][$multiple_upload['index']][$multiple_upload['field']][$key];
                    $formatted_files[$key]['tmp_name'] = $files['tmp_name'][$multiple_upload['index']][$multiple_upload['field']][$key];
                }
            } else {
                foreach ($files['name'] as $key => $value) {
                    $formatted_files[$key]['name'] = $value;
                    $formatted_files[$key]['type'] = $files['type'][$key];
                    $formatted_files[$key]['error'] = $files['error'][$key];
                    $formatted_files[$key]['size'] = $files['size'][$key];
                    $formatted_files[$key]['tmp_name'] = $files['tmp_name'][$key];
                    
                }
            }
            
            foreach ($formatted_files as $key => $current_file) {

                $current_file['src_file_name'] = $current_file['name'];
                $current_file['name'] = $this->generateFileName();
                $handle = new upload($current_file);
                $handle->dir_chmod = 0755;
                $handle->allowed = $allowed_file_types;
                if ($handle->file_is_image === true) {
                    $handle->image_watermark = COMPANY_NAME;
                }
                $handle->process($upload_directory);
                if ($handle->processed) {
                    $upload_result[] = array(
                        'name' => $current_file['name'],
                        'display_name' => $current_file['src_file_name'],
                        'mime' => $current_file['type'],
                        'size' => $current_file['size'],
                        'location' => $upload_directory,
                        'fullpath' => $handle->file_dst_pathname
                    );
                    $handle->clean();
                } else {
                    $upload_result[] = $handle->error;
                }
                
            }
            return $upload_result;
        } else {
            echo 'files list is empty';
            exit;
        }

    }

    function generateFileName() {

        return uniqid(true) . "_" . str_shuffle(implode(range("m", "t")));

    }

}
