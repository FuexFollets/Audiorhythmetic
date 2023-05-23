#include <string>
#include <AudioFile.h>

namespace ar { // Audiorhythmetic namespace
    template <typename T> using is_viable_number_encoding = std::integral_constant<bool,
        std::is_same_v<T, std::int32_t> || std::is_same_v<T, std::uint32_t> ||
        std::is_same_v<T, std::int64_t> || std::is_same_v<T, std::uint64_t> ||
        std::is_same_v<T, float> || std::is_same_v<T, double>>;

    template <typename T> concept viable_number_encoding = is_viable_number_encoding<T>::value;

    template <typename EncodedType> struct cpp_audio_file {
        public:

        cpp_audio_file() = default;
        explicit cpp_audio_file(const std::string& file_name, const std::string& bytes);

        AudioFile<EncodedType> file_data;
        std::string file_name;
    };
}
