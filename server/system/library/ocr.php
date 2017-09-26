<?php

/**
 * Description of ocr
 *
 * @author megamtech
 */
class MegamOCR extends TesseractOCR {

    function test() {


        echo (new TesseractOCR('/home/megamtech/accountdesk/server/uploads/ocr/logger_660_072313111944.jpg'))
                ->lang('eng')
                ->run();

    }

}
