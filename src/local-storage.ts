export default {

    /**
     * 添加或修改
     *
     * @param {*} key
     * @returns
     */
    set(key: any, data: any) {
        if (data !== null && (typeof data === 'object')) {
            data = JSON.stringify(data);
        }
        localStorage.setItem(key, data);
    },

    /**
     * get查询
     */
    get(key: any) {
        const val = localStorage.getItem(key);
        if (val === null || val === 'null') {
            return null;
        } else if (val === 'undefined') {
            return undefined;
        } else {
            try {
                return JSON.parse(val);  // 解析成功说明是JSON
            } catch (e) {
                return val;
            }
        }
    },

    /**
     * 修改 key 对应对象 中的字段
     * 如果对象不存在则创建
     */
    modify(key: any, fields: any) {
        let obj = this.get(key);
        if (obj === null) {
            obj = {};
        }
        if (obj instanceof Object && fields) {
            for (const name in fields) {
                if (name !== null) {
                    obj[name] = fields[name];
                }
            }
            this.set(key, obj);
        }
    },

    /**
     * 删除
     */
    remove(key: any) {
        if (key instanceof Array) {
            for (const k of key) {
                if (k !== null) {
                    localStorage.removeItem(k);
                }
            }
        } else {
            localStorage.removeItem(key);
        }
    }
};

