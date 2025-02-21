package com.nanuri.rams.business.assessment.tb90.tb9010;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9010B")
@RequiredArgsConstructor
@RestController
public class TB9010APIController {

    private final TB9010Service tb9010Service;

    // @PostMapping(value = "/select")
    // public int select(@RequestBody int data) {
    //     return tb9010Service.select(data);
    // }

    @PostMapping(value = "/insert")
        public int insert(@RequestBody IBIMS997BDTO param) {
                return tb9010Service.insert(param);
        }

    // @PostMapping(value = "/delete")
    // public int delete(@RequestBody int data) {
    //     return tb9010Service.delete(data);
    // }

}
