#include <numeric>
#include <iostream>
#include <cstring>
#include <string>
#include <AudioFile.h>

#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/em_macros.h>

int cppten() {
    return 10;
}

int cppaddone(int number) {
    return number + 1;
}

/*
int cppstrlen(const char* str) {
    return std::strlen(str);
}
*/

int cppsum(const std::string& bytes) {
    return std::accumulate(bytes.begin(), bytes.end(), 0);
}

int main() {
    std::cout << "Printing from wasm module!\n";
}

int cppstrlenstd(const std::string& str) {
    return str.length();
}

std::string range(int start, int end) {
    std::string result;

    for (int iteration {start}; iteration < end; iteration++) {
        result += static_cast<char>(iteration);
    }

    return result;
}

std::string cppgetstr() {
    return "Hello from C++";
}

struct data_struct {
    data_struct(int value_a, int value_b, int value_c) :
        a {value_a}, b {value_b}, c {value_c} {}

    int a;
    int b;
    int c;

    int sum() {
        return a + b + c;
    }
};

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::function("cppten", &cppten);
    emscripten::function("cppaddone", &cppaddone);
    // emscripten::function("cppstrlen", &cppstrlen);
    emscripten::function("cppsum", &cppsum);
    emscripten::function("cppstrlen", &cppstrlenstd);
    emscripten::function("range", &range);
    emscripten::function("cppgetstr", &cppgetstr);

    emscripten::class_<data_struct>("data_struct")
        .constructor<int, int, int>()
        .property("a", &data_struct::a)
        .property("b", &data_struct::b)
        .property("c", &data_struct::c)
        .function("sum", &data_struct::sum);
}
