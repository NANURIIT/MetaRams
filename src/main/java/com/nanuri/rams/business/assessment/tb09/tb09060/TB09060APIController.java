package com.nanuri.rams.business.assessment.tb09.tb09060;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.vo.IBIMS436BVO;
import com.nanuri.rams.business.common.dto.IBIMS437BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;


@Slf4j
@RequestMapping("/TB09060S")
@RequiredArgsConstructor
@RestController
public class TB09060APIController {

        private final TB09060Service tb9060Service;


        @PostMapping(value = "/insert")
        public int insert(@RequestBody IBIMS997BDTO param) {
                return tb9060Service.insert(param);
        }
        
        @PostMapping("/getOvduDtls")
        public List<IBIMS436BVO> getOvduDtls(@RequestBody IBIMS436BVO param) {
            return tb9060Service.getOvduDtls(param);
        }
        
        @PostMapping("/getOvduDailyDtls")
        public List<IBIMS437BDTO> getOvduDailyDtls(@RequestBody IBIMS437BDTO param) {
            return tb9060Service.getOvduDailyDtls(param);
        }

        @PostMapping("/saveDcsn")
        public int saveDcsn(@RequestBody IBIMS436BVO param) {
            return tb9060Service.saveDcsn(param);
        }
}
